import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { SubjectSchema } from './schemas/subject.schema/subject.schema';
import { HomeworksModule } from '../homeworks/homeworks.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Subjects', // name of db table
        useFactory: () => {
          // defining nested field index
          SubjectSchema.index({ 'field1.nestedField': 1 }, { unique: true });
          // defining single field index
          SubjectSchema.index({ field2: 1 }, { unique: true });
          // defining multiple fields composite key index
          SubjectSchema.index({ field3: 1, field4: 1 }, { unique: true });
          // defining text indexes
          SubjectSchema.index({ searchField1: 'text', searchField2: 'text' });

          SubjectSchema.set('toJSON', {
            virtuals: true,
            getters: true,
            transform: (doc, ret, options) => {
              ret.subjectId = ret._id;
              delete ret._id;
              delete ret.id;
              delete ret.__v;
              delete ret.someField;
              // change the data from database if needed before
              // returning to user

              if (ret.emails) {
                for (let i = 0; i < ret.emails.length; i++) {
                  if (ret.emails[i].otp) {
                    delete ret.emails[i].otp;
                  }
                }
              }
            },
          });

          SubjectSchema.set('toObject', {
            virtuals: true,
          });
          // setup virtuals
          SubjectSchema.virtual('virtualFields', {
            ref: 'RefDbName', // reference db
            localField: '_id', // leave it as is
            foreignField: 'subjectId', // change subject to module name
            justOne: false, // leave it as is
          });

          return SubjectSchema;
        },
      },
    ]),

    // include the dependency modules here
    forwardRef(() => SharedModule),
    forwardRef(() => HomeworksModule),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
