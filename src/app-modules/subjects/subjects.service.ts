import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HelperService } from 'src/shared/helpers/helper/helper.service';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorConstant } from 'src/constants/error';
import { Subject } from './models/subject/subject';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel('Subjects')
    private readonly subjectModel: Model<Subject>,
    private readonly helperService: HelperService,
  ) {}

  async get(query?: { [key: string]: any }) {
    let readQuery: { [key: string]: any } = {};

    if (query.subjectId) {
      readQuery._id = query.subjectId;
    }
    // for comma separated values, split it and use $in
    if (query.subjectIds) {
      readQuery._id = { $in: query.subjectIds.split(',') };
    }

    // if (query.someId) {
    //   readQuery.someSchemaId = query.someId;
    // }

    if (query.tutorId) {
      readQuery.tutorId = query.tutorId;
    }

    if (query.subjectId) {
      readQuery.subjectId = query.subjectId;
    }

    if (query.subjectName) {
      readQuery.subjectName = {
        $regex: new RegExp(query.subjectName, 'i'),
      };
    }

    // this is to query multiple fields for a string (mongodb full-text
    // search)
    if (query.search) {
      readQuery['$text'] = { $search: query.search };
    }

    let limit: number = !isNaN(query.limit)
      ? query.limit === -1
        ? 0
        : query.limit
      : 20;

    let page: number = !isNaN(query.page) ? query.page : 1;
    let skip = (page - 1) * limit;

    query.fields = query.fields
      ? query.fields
          .split(',')
          .reduce((a: any, b: any) => ((a[b] = true), a), {})
      : {};

    let subjects = await this.subjectModel
      .find(readQuery)
      // .populate('homeworkId')
      .populate('sclassId')
      .select(query.fields)
      .limit(limit)
      .skip(skip)
      .populate(query.populate || '') // this is experimental field
      .exec();

    let totalCount = await this.subjectModel.countDocuments(readQuery);

    return {
      totalCount,
      currentCount: subjects.length,
      subjects: (subjects.length && subjects) || null,
    };
  }

  async create(subject: { [key: string]: any }) {
    let newSubject = new this.subjectModel(subject);

    let validationErrors = newSubject.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    try {
      return await newSubject.save();
    } catch (e) {
      throw new BadRequestException({
        error: ErrorConstant.DUPLICATE_ENTITY,
        msgVars: {
          entity: 'Subject',
        },
      });
    }
  }

  async update(subject: { [key: string]: any }) {
    let foundSclass = await this.subjectModel
      .findOne({
        _id: subject.subjectId,
      })
      .exec();

    if (!foundSclass) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'subjectId',
        },
      });
    }

    if (subject.tutorId) {
      foundSclass.tutorId = subject.tutorId;
    }

    if (subject.sclassId) {
      foundSclass.sclassId = subject.sclassId;
    }

    if (subject.subjectName) {
      foundSclass.subjectName = subject.subjectName;
    }

    foundSclass.timestamp.updatedAt = new Date().getTime();

    let validationErrors = foundSclass.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    return await foundSclass.save();
  }

  async delete(subjectId: string) {
    return await this.subjectModel.findOneAndDelete({
      _id: subjectId,
    });
  }

  async deleteBy(query: { [key: string]: any }) {
    const subjects = await this.subjectModel.find(query).exec();

    for (const subject of subjects) {
      await this.delete(String(subject._id));
    }

    return null;
  }
}
