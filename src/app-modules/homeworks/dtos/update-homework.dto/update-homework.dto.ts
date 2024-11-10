import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHomeworkDTO {
  @IsMongoId()
  homeworkId: string;

  @IsMongoId()
  sclassId: string;

  @IsMongoId()
  subjectId: string;

  @IsMongoId()
  tutorId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
