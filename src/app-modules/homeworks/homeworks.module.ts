import { forwardRef, Module } from '@nestjs/common';
import { HomeworksController } from './homeworks.controller';
import { HomeworksService } from './homeworks.service';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from '../users/users.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeworkSchema } from './schemas/homework.schema/homework.schema';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeatureAsync([
        {
          name: 'Homeworks', // name of db table
          // imports: [HomeworksModule],
          useFactory: () => {
            HomeworkSchema.index(
              { sclassId: 1, tutorId: 1, subjectId: 1, title: 1 },
              { unique: true },
            );

            // defining text indexes
            HomeworkSchema.index({
              className: 'text',
              description: 'text',
            });

            HomeworkSchema.set('toJSON', {
              virtuals: true,
              getters: true,
              transform: (doc, ret, options) => {
                ret.homeworkId = ret._id;
                delete ret._id;
                delete ret.id;
                delete ret.__v;
              },
            });

            return HomeworkSchema;
          },
        },
      ]),
    ),

    // include the dependency modules here
    forwardRef(() => SubjectsModule),
    forwardRef(() => SharedModule),
    forwardRef(() => UsersModule),
  ],

  controllers: [HomeworksController],
  providers: [HomeworksService],
  exports: [HomeworksService],
})
export class HomeworksModule {}
