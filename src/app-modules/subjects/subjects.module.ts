import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { SubjectSchema } from './schemas/subject.schema/subject.schema';
import { HomeworksModule } from '../homeworks/homeworks.module';
import { UsersModule } from '../users/users.module';
import { HomeworksService } from '../homeworks/homeworks.service';
import { Subject } from './models/subject/subject';
import { SclassesModule } from '../sclasses/sclasses.module';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeatureAsync([
        {
          name: 'Subjects', // name of db table
          // imports: [HomeworksModule],
          useFactory: () => {
            SubjectSchema.index(
              { sclassId: 1, studentId: 1, subjectName: 1 },
              { unique: true },
            );

            // defining text indexes
            SubjectSchema.index({
              className: 'text',
            });

            SubjectSchema.set('toJSON', {
              virtuals: true,
              getters: true,
              transform: (doc, ret, options) => {
                ret.subjectId = ret._id;
                delete ret._id;
                delete ret.id;
                delete ret.__v;
                // delete ret.someField;
                // change the data from database if needed before
                // returning to user
              },
            });

            // SubjectSchema.set('toObject', {
            //   virtuals: true,
            // });
            // // setup virtuals
            // SubjectSchema.virtual('subjects', {
            //   ref: 'Subjects',
            //   localField: '_id',
            //   foreignField: 'sclassId',
            //   justOne: false,
            // });

            // SubjectSchema.post<Subject>('findOneAndRemove', async (sclass) => {
            //   await homeworksService.deleteBy({
            //     sclassId: sclass['_id'],
            //   });

            //   return null;
            // });

            return SubjectSchema;
          },

          // inject: [forwardRef(() => SubjectsService)],
        },
      ]),
    ),

    // include the dependency modules here
    forwardRef(() => SharedModule),
    forwardRef(() => UsersModule),
    forwardRef(() => SclassesModule),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
