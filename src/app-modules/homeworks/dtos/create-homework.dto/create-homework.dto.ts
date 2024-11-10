import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  //   file?: File;

  @IsMongoId()
  tutorId: string;

  @IsMongoId()
  sclassId: string;

  @IsMongoId()
  subjectId: string;
}
