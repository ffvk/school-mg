import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './models/order/order';
import { HelperService } from 'src/shared/helpers/helper/helper.service';
import { ErrorConstant } from 'src/constants/error';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders')
    private readonly orderModel: Model<Order>,
    private readonly helperService: HelperService,
  ) {}

  async get(query?: { [key: string]: any }) {
    let readQuery: { [key: string]: any } = {};

    if (query.orderId) {
      readQuery._id = query.orderId;
    }

    if (query.orderIds) {
      readQuery._id = { $in: query.orderIds.split(',') };
    }

    if (query.name) {
      readQuery.name = { $regex: new RegExp(query.name, 'i') };
    }

    if (query.userId) {
      readQuery.userId = query.userId;
    }

    if (query.productId) {
      readQuery.productId = query.productId;
    }

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

    let orders = await this.orderModel
      .find(readQuery)
      .populate('userId')
      .populate('productId')
      // .populate('userId')
      .select(query.fields)
      .limit(limit)
      .sort(query.sort)
      .skip(skip)
      .exec();

    let totalCount = await this.orderModel.countDocuments(readQuery);

    return {
      totalCount,
      currentCount: orders.length,
      orders: (orders.length && orders) || null,
    };
  }

  async create(order: { [key: string]: any }) {
    let newOrder = new this.orderModel(order);

    let validationErrors = newOrder.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    try {
      return await newOrder.save();
    } catch (e) {
      throw new BadRequestException({
        error: ErrorConstant.UNKNOWN_ERROR,
        msgVars: {
          message: e,
        },
      });
    }
  }

  async update(order: { [key: string]: any }) {
    let foundUser = await this.orderModel
      .findOne({
        _id: order.orderId,
      })
      .exec();

    if (!foundUser) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'orderId',
        },
      });
    }

    if (order.name) {
      foundUser.name = order.name;
    }

    foundUser.timestamp.updatedAt = new Date().getTime();

    let validationErrors = foundUser.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    return await foundUser.save();
  }

  async delete(orderId: string) {
    return await this.orderModel.findOneAndDelete({ _id: orderId });
  }

  //   async deleteBy(query: { [key: string]: any }) {
  //     const orders = await this.orderModel.find(query).exec();

  //     for (const order of orders) {
  //       await this.delete(String(order._id));
  //     }

  //     return null;
  //   }
}
