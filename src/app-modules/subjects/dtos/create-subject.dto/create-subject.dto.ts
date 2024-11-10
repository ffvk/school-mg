import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDTO {
  @IsMongoId()
  tutorId: string;

  @IsMongoId()
  classId: string;

  @IsString()
  @IsNotEmpty()
  subjectName: string;
}
