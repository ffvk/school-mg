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
import { OrdersService } from './orders.service';
import { GetOrdersDTO } from './dtos/get-orders.dto/get-orders.dto';
import { CreateOrderDTO } from './dtos/create-order.dto/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto/update-order.dto';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { RestrictOrdersGuard } from 'src/shared/guards/restrictors/restrict-orders/restrict-orders.guard';
import { OrderIdGuard } from 'src/shared/guards/validators/order-id/order-id.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(RestrictOrdersGuard)
  async getOrders(@Query() getOrdersDTO: GetOrdersDTO) {
    return await this.ordersService.get(getOrdersDTO);
  }

  @Post()
  @UseGuards()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    return await this.ordersService.create(createOrderDTO);
  }

  @Put()
  @UseGuards(OrderIdGuard)
  async updateOrder(@Body() updateOrderDTO: UpdateOrderDTO) {
    return await this.ordersService.update(updateOrderDTO);
  }

  @Delete()
  @UseGuards(OrderIdGuard)
  async deleteOrder(@Body('orderId', ParseMongoIdPipe) orderId: string) {
    return await this.ordersService.delete(orderId);
  }
}
