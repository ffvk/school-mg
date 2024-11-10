import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Homework } from './models/homework/homework';
import { Model } from 'mongoose';
import { HelperService } from 'src/shared/helpers/helper/helper.service';
import { ErrorConstant } from 'src/constants/error';

@Injectable()
export class HomeworksService {
  constructor(
    @InjectModel('Homeworks')
    private readonly homeworkModel: Model<Homework>,
    private readonly helperService: HelperService,
  ) {}

  async get(query?: { [key: string]: any }) {
    let readQuery: { [key: string]: any } = {};

    if (query.homeworkId) {
      readQuery._id = query.homeworkId;
    }

    if (query.homeworkIds) {
      readQuery._id = { $in: query.homeworkIds.split(',') };
    }

    if (query.sclassId) {
      readQuery.sclassId = query.sclassId;
    }

    if (query.subjectId) {
      readQuery.subjectId = query.subjectId;
    }

    if (query.tutorId) {
      readQuery.tutorId = query.tutorId;
    }

    if (query.title) {
      readQuery.title = { $regex: new RegExp(query.title, 'i') };
    }

    if (query.description) {
      readQuery.description = { $regex: new RegExp(query.description, 'i') };
    }

    if (query.fileUrl) {
      readQuery['file.url'] = { $regex: new RegExp(query.fileUrl, 'i') };
    }

    if (!isNaN((query.minFileSize = parseInt(query.minFileSize)))) {
      if (!readQuery['$and']) {
        readQuery['$and'] = [];
      }

      readQuery['$and'].push({
        'file.size': { $gte: query.minFileSize },
      });
    }

    if (!isNaN((query.maxFileSize = parseInt(query.maxFileSize)))) {
      if (!readQuery['$and']) {
        readQuery['$and'] = [];
      }

      readQuery['$and'].push({
        'file.size': { $lte: query.maxFileSize },
      });
    }

    if (query.fileType) {
      readQuery['file.type'] = query.fileType;
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

    if (query.reason) {
      readQuery.reason = query.reason;
    }

    if (query.search) {
      readQuery['$text'] = { $search: query.search };
    }

    readQuery.sort = { 'timestamp.createdAt': 1 };
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

    let homeworks = await this.homeworkModel
      .find(readQuery)
      .select(query.fields)
      .limit(limit)
      .skip(skip)
      .sort(query.sort)
      // .populate('sclassId')
      .populate('subjectId')
      .populate(query.populate || '') // this is experimental field
      .exec();

    let totalCount = await this.homeworkModel.countDocuments(readQuery);

    return {
      totalCount,
      currentCount: homeworks.length,
      homeworks: (homeworks.length && homeworks) || null,
    };
  }

  async create(homework: { [key: string]: any }) {
    let newHomework = new this.homeworkModel(homework);

    let validationErrors = newHomework.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    try {
      return await newHomework.save();
    } catch (e) {
      throw new BadRequestException({
        error: ErrorConstant.DUPLICATE_ENTITY,
        msgVars: {
          entity: 'Homework',
        },
      });
    }
  }

  async update(homework: { [key: string]: any }) {
    let foundHomework = await this.homeworkModel
      .findOne({
        _id: homework.homeworkId,
      })
      .exec();

    if (!foundHomework) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'homeworkId',
        },
      });
    }

    if (homework.sclassId) {
      foundHomework.sclassId = homework.sclassId;
    }

    if (homework.subjectId) {
      foundHomework.subjectId = homework.subjectId;
    }

    if (homework.tutorId) {
      foundHomework.tutorId = homework.tutorId;
    }

    if (homework.title) {
      foundHomework.title = homework.title;
    }

    if ('description' in homework) {
      foundHomework.description = homework.description;
    }

    if (homework.file) {
      foundHomework.file = homework.file;
    }

    foundHomework.timestamp.updatedAt = new Date().getTime();

    let validationErrors = foundHomework.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    return await foundHomework.save();
  }

  async updateBy(
    query: { [key: string]: any },
    update: { [key: string]: any },
  ) {
    const homeworks = await this.homeworkModel.find(query).exec();

    let updatedHomeworks = [];

    for (const homework of homeworks) {
      updatedHomeworks.push(
        await this.update({
          homeworkId: homework._id,
          ...homework,
          ...update,
        }),
      );
    }

    return updatedHomeworks;
  }

  async delete(homeworkId: string) {
    return await this.homeworkModel.findOneAndRemove({
      _id: homeworkId,
    });
  }

  async deleteBy(query: { [key: string]: any }) {
    const homeworks = await this.homeworkModel.find(query).exec();

    for (const homework of homeworks) {
      await this.delete(String(homework._id));
    }

    return null;
  }
}
