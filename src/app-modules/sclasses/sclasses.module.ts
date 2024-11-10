import { forwardRef, Module } from '@nestjs/common';
import { SclassesController } from './sclasses.controller';
import { SclassesService } from './sclasses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsModule } from '../subjects/subjects.module';
import { SubjectsService } from '../subjects/subjects.service';
import { SclassSchema } from './schemas/sclass.schema/sclass.schema';
import { Sclass } from './models/sclass/sclass';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeatureAsync([
        {
          name: 'Sclasses', // name of db table
          // imports: [SubjectsModule],
          useFactory: () => {
            SclassSchema.index(
              { tutorId: 1, studentId: 1, className: 1 },
              { unique: true },
            );

            // defining text indexes
            SclassSchema.index({
              className: 'text',
            });

            SclassSchema.set('toJSON', {
              virtuals: true,
              getters: true,
              transform: (doc, ret, options) => {
                ret.sclassId = ret._id;
                delete ret._id;
                delete ret.id;
                delete ret.__v;
                // delete ret.someField;
                // change the data from database if needed before
                // returning to user
              },
            });

            //   SclassSchema.set('toObject', {
            //     virtuals: true,
            //   });
            //   // setup virtuals
            //   SclassSchema.virtual('subjects', {
            //     ref: 'Subjects',
            //     localField: '_id',
            //     foreignField: 'sclassId',
            //     justOne: false,
            //   });

            //   SclassSchema.post<Sclass>('findOneAndRemove', async (sclass) => {
            //     await subjectsService.deleteBy({
            //       sclassId: sclass['_id'],
            //     });

            //     return null;
            //   });

            return SclassSchema;
          },

          // inject: [forwardRef(() => SubjectsService)],
        },
      ]),
    ),

    // include the dependency modules here
    forwardRef(() => SharedModule),
    forwardRef(() => UsersModule),
  ],

  controllers: [SclassesController],
  providers: [SclassesService],
  exports: [SclassesService],
})
export class SclassesModule {}
