import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from 'src/app-modules/orders/orders.service';
import { ErrorConstant } from 'src/constants/error';
import { TicketModel } from 'src/shared/models/ticket-model/ticket-model';

@Injectable()
export class OrderIdGuard implements CanActivate {
  constructor(private readonly ordersService: OrdersService) {}

  async canActivate(context: ExecutionContext) {
    /**
     * This confirms that the userId provided by the client is allowed for the client
     * For that to happen, it needs to be validated against userId and restrictByParams
     */
    const ctx = context.switchToHttp();
    let req = ctx.getRequest<Request>();

    if (!req['ticket']) {
      throw new UnauthorizedException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'ticket' },
      });
    }

    if (!req.body.orderId) {
      throw new BadRequestException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'orderId' },
      });
    }

    let query = {
      orderId: req.body.orderId,
      deleted: 'all',
    };

    const { user, permission } = req['ticket'] as TicketModel;

    switch (permission.restriction) {
      case 'userId': {
        query['userId'] = String(user._id);
        break;
      }

      default: {
        break;
      }
    }

    let foundUser = await this.ordersService.get(query);

    if (!foundUser || !foundUser.totalCount) {
      throw new UnauthorizedException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'orderId',
        },
      });
    }

    if (!req['storage']) {
      req['storage'] = {};
    }

    req['storage']['order'] = foundUser.orders[0];

    return true;
  }
}
