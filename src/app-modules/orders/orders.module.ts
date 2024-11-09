import { Module, forwardRef } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'src/shared/shared.module';
import { OrderSchema } from './schemas/order.schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Orders',
        useFactory: () => {
          // OrderSchema.index({ userId: 1, productId: 1 }, { unique: true });

          OrderSchema.set('toJSON', {
            getters: true,
            transform: (doc, ret, options) => {
              ret.orderId = ret._id;
              delete ret._id;
              delete ret.id;
              delete ret.__v;
            },
          });

          return OrderSchema;
        },
      },
    ]),

    forwardRef(() => SharedModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
