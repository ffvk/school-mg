import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SclassesService } from 'src/app-modules/sclasses/sclasses.service';
import { ErrorConstant } from 'src/constants/error';
import { TicketModel } from 'src/shared/models/ticket-model/ticket-model';

@Injectable()
export class SclassIdGuard implements CanActivate {
  constructor(private readonly sclassesService: SclassesService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    let req = ctx.getRequest<Request>();

    if (!req['ticket']) {
      throw new UnauthorizedException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'ticket' },
      });
    }

    if (!req.body.sclassId) {
      throw new UnauthorizedException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: { field: 'sclassId' },
      });
    }

    let query = {
      sclassId: req.body.sclassId,
      deleted: 'all',
    };

    const { user, permission } = req['ticket'] as TicketModel;

    switch (permission.restriction) {
      case 'userId': {
        query['sclassorId'] = String(user._id);
        break;
      }

      default: {
        break;
      }
    }

    let foundSclass = await this.sclassesService.get(query);

    if (!foundSclass || !foundSclass.totalCount) {
      throw new UnauthorizedException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'sclassId',
        },
      });
    }

    if (!req['storage']) {
      req['storage'] = {};
    }

    req['storage']['sclass'] = foundSclass.sclasss[0];
    return true;
  }
}
