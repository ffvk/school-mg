import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product/product';
import { Model } from 'mongoose';
import { HelperService } from 'src/shared/helpers/helper/helper.service';
import { ErrorConstant } from 'src/constants/error';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<Product>,
    private readonly helperService: HelperService,
  ) {}

  async get(query?: { [key: string]: any }) {
    let readQuery: { [key: string]: any } = {};

    if (query.productId) {
      readQuery._id = query.productId;
    }

    if (query.productIds) {
      readQuery._id = { $in: query.productIds.split(',') };
    }

    if (query.name) {
      readQuery.name = { $regex: new RegExp(query.name, 'i') };
    }

    if (query.description) {
      readQuery.description = query.description;
    }

    if (query.price) {
      readQuery.price = query.price;
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

    let products = await this.productModel
      .find(readQuery)
      .select(query.fields)
      .limit(limit)
      .sort(query.sort)
      .skip(skip)
      .exec();

    let totalCount = await this.productModel.countDocuments(readQuery);

    return {
      totalCount,
      currentCount: products.length,
      products: (products.length && products) || null,
    };
  }

  async create(product: { [key: string]: any }) {
    let newProduct = new this.productModel(product);

    let validationErrors = newProduct.validateSync();

    if (validationErrors) {
      let error =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]]
          .message;

      throw new BadRequestException(this.helperService.getDbErr(error));
    }

    try {
      return await newProduct.save();
    } catch (e) {
      throw new BadRequestException({
        error: ErrorConstant.UNKNOWN_ERROR,
        msgVars: {
          message: e,
        },
      });
    }
  }

  async update(product: { [key: string]: any }) {
    let foundUser = await this.productModel
      .findOne({
        _id: product.productId,
      })
      .exec();

    if (!foundUser) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'productId',
        },
      });
    }

    if (product.name) {
      foundUser.name = product.name;
    }

    if (product.description) {
      foundUser.description = product.description;
    }

    if (product.price) {
      foundUser.price = product.price;
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

  async delete(productId: string) {
    return await this.productModel.findOneAndDelete({ _id: productId });
  }
}
