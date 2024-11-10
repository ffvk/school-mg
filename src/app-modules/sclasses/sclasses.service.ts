import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sclass } from './models/sclass/sclass';
import { Model } from 'mongoose';
import { HelperService } from 'src/shared/helpers/helper/helper.service';
import { ErrorConstant } from 'src/constants/error';

@Injectable()
export class SclassesService {
  constructor(
    @InjectModel('Sclasses')
    private readonly sclassModel: Model<Sclass>,
    private readonly helperService: HelperService,
  ) {}

  async get(query?: { [key: string]: any }) {
    let readQuery: { [key: string]: any } = {};

    if (query.sclassId) {
      readQuery._id = query.sclassId;
    }
    // for comma separated values, split it and use $in
    if (query.sclassIds) {
      readQuery._id = { $in: query.sclassIds.split(',') };
    }

    if (query.studentId) {
      readQuery.studentId = query.studentId;
    }

    if (query.tutorId) {
      readQuery.tutorId = query.tutorId;
    }

    if (query.className) {
      readQuery.className = {
        $regex: new RegExp(query.className, 'i'),
      };
    }

    if (query.description) {
      readQuery.description = {
        $regex: new RegExp(query.description, 'i'),
      };
    }

    if (query['$or']) {
      readQuery['$or'] = query['$or'];
    }

    readQuery.deleted = false;
    if (String(query.deleted) === 'true' || String(query.deleted) === 'false') {
      readQuery.deleted = String(query.deleted) === 'true';
    }

    if (String(query.deleted) === 'all') {
      delete readQuery.deleted;
    }

    // if (!isNaN((query.deadline = parseInt(query.deadline)))) {
    //   readQuery.deadline = query.deadline;
    // }

    // this is to query multiple fields for a string (mongodb full-text
    // search)
    if (query.search) {
      readQuery['$text'] = { $search: query.search };
    }

    readQuery.sort = { 'timestamp.createdAt': -1 };
    if (query.sort) {
      switch (query.sort) {
        case 'mrc': {
          readQuery.sort = { 'timestamp.createdAt': -1 };
          break;
        }

        case 'mru': {
          readQuery.sort = { 'timestamp.updatedAt': -1 };
          break;
        }

        case 'namea': {
          readQuery.sort = { name: 1 };
          break;
        }

        case 'named': {
          readQuery.sort = { name: -1 };
          break;
        }
      }
    }

    query.sort = readQuery.sort;
    delete readQuery.sort;

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

    let sclasss = await this.sclassModel
      .find(readQuery)
      .populate('subjects', {
        match: { deleted: false },
      })
      .populate({
        path: 'subjects',
        populate: {
          path: 'homeworks',
          model: 'Homework',
        },
      })
      .select(query.fields)
      .limit(limit)
      .skip(skip)
      .sort(query.sort)
      .populate(query.populate || '') // this is experimental field
      .exec();

    let totalCount = await this.sclassModel.countDocuments(readQuery);

    return {
      totalCount,
      currentCount: sclasss.length,
      sclasss: (sclasss.length && sclasss) || null,
    };
  }

  async create(sclass: { [key: string]: any }) {
    let newSclass = new this.sclassModel(sclass);

    let validationErrors = newSclass.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    try {
      return await newSclass.save();
    } catch (e) {
      throw new BadRequestException({
        error: ErrorConstant.UNKNOWN_ERROR,
        msgVars: {
          message: e,
        },
      });
    }
  }

  async update(sclass: { [key: string]: any }) {
    let foundSclass = await this.sclassModel
      .findOne({
        _id: sclass.sclassId,
      })
      .exec();

    if (!foundSclass) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'sclassId',
        },
      });
    }

    if (sclass.tutorId) {
      foundSclass.tutorId = sclass.tutorId;
    }

    if (sclass.studentId) {
      foundSclass.studentId = sclass.studentId;
    }

    if (sclass.className) {
      foundSclass.className = sclass.className;
    }

    // if (!isNaN((sclass.deadline = parseFloat(sclass.deadline)))) {
    //   foundSclass.deadline = sclass.deadline;
    // }

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

  async updateBy(
    query: { [key: string]: any },
    update: { [key: string]: any },
  ) {
    const sclasss = await this.sclassModel.find(query).exec();

    let updatedSclasses = [];

    for (const sclass of sclasss) {
      updatedSclasses.push(
        await this.update({ sclassId: sclass._id, ...sclass, ...update }),
      );
    }

    return updatedSclasses;
  }

  async delete(sclassId: string) {
    return await this.sclassModel.findOneAndRemove({ _id: sclassId });
  }

  async deleteBy(query: { [key: string]: any }) {
    const sclasss = await this.sclassModel.find(query).exec();

    for (const sclass of sclasss) {
      await this.delete(String(sclass._id));
    }

    return null;
  }
}
