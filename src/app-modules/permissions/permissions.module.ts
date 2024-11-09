import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema } from './schemas/permission.schema/permission.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Permissions',
        useFactory: () => {
          PermissionSchema.index(
            { resourceId: 1, resourceName: 1, resourceAction: 1 },
            { unique: true },
          );

          PermissionSchema.set('toJSON', {
            virtuals: true,
            transform: (doc, ret, options) => {
              ret.permissionId = ret._id;
              delete ret._id;
              delete ret.id;
              delete ret.__v;
              // delete ret.someField;
              // change the data from database if needed before
              // returning to user
            },
          });

          return PermissionSchema;
        },
      },
    ]),

    forwardRef(() => SharedModule),
  ],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
