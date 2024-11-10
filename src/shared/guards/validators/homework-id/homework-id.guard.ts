import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { HomeworksService } from 'src/app-modules/homeworks/homeworks.service';
import { ErrorConstant } from 'src/constants/error';
import { TicketModel } from 'src/shared/models/ticket-model/ticket-model';

@Injectable()
export class HomeworkIdGuard implements CanActivate {
  constructor(private readonly homeworksService: HomeworksService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    let req = ctx.getRequest<Request>();

    if (!req['ticket']) {
      throw new UnauthorizedException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'ticket' },
      });
    }

    if (!req.body.homeworkId) {
      throw new UnauthorizedException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'homeworkId' },
      });
    }

    let query = {
      homeworkId: req.body.homeworkId,
      deleted: 'all',
    };

    const { user, permission } = req['ticket'] as TicketModel;

    switch (permission.restriction) {
      case 'userId': {
        query['homeworkorId'] = String(user._id);
        break;
      }

      default: {
        break;
      }
    }

    let foundHomework = await this.homeworksService.get(query);

    if (!foundHomework || !foundHomework.totalCount) {
      throw new UnauthorizedException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'homeworkId',
        },
      });
    }

    if (!req['storage']) {
      req['storage'] = {};
    }

    req['storage']['homework'] = foundHomework.homeworks[0];
    return true;
  }
}
