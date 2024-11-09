import { Module, forwardRef } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema/product.schema';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Products',
        useFactory: () => {
          // ProductSchema.index({ userId: 1 }, { unique: true });
          ProductSchema.index({ name: 'text' });

          ProductSchema.set('toJSON', {
            getters: true,
            transform: (doc, ret, options) => {
              ret.productId = ret._id;
              delete ret._id;
              delete ret.id;
              delete ret.__v;
            },
          });

          return ProductSchema;
        },
      },
    ]),

    forwardRef(() => SharedModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
