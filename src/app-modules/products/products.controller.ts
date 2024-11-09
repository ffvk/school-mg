import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RestrictProductsGuard } from 'src/shared/guards/restrictors/restrict-products/restrict-products.guard';
import { GetProductsDTO } from './dtos/get-products.dto/get-products.dto';
import { CreateProductDTO } from './dtos/create-product.dto/create-product.dto';
import { ProductIdGuard } from 'src/shared/guards/validators/product-id/product-id.guard';
import { UpdateProductDTO } from './dtos/update-product.dto/update-product.dto';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(RestrictProductsGuard)
  async getProducts(@Query() getProductsDTO: GetProductsDTO) {
    return await this.productsService.get(getProductsDTO);
  }

  @Post()
  @UseGuards()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    return await this.productsService.create(createProductDTO);
  }

  @Put()
  @UseGuards(ProductIdGuard)
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO) {
    return await this.productsService.update(updateProductDTO);
  }

  @Delete()
  @UseGuards(ProductIdGuard)
  async deleteProduct(@Body('productId', ParseMongoIdPipe) productId: string) {
    return await this.productsService.delete(productId);
  }
}
