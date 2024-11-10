import { Transform } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetHomeworkDTO {
  @IsMongoId()
  @IsOptional()
  homeworkId: string;

  @IsString()
  @IsOptional()
  homeworkIds: string;

  @IsMongoId()
  @IsOptional()
  tutorId: string;

  @IsMongoId()
  @IsOptional()
  sclassId: string;

  @IsMongoId()
  @IsOptional()
  subjectId: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  fileUrl: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  minFileSize: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  maxFileSize: number;

  @IsOptional()
  @IsString()
  fileType: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsOptional()
  @IsString()
  fields: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  populate: string;
}
