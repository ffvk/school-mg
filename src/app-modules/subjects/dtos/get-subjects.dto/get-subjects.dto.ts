import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetSubjectsDTO {
  @IsMongoId()
  @IsOptional()
  subjectId: string;

  @IsString()
  @IsOptional()
  subjectIds: string;

  @IsString()
  @IsOptional()
  sclassId: string;

  @IsString()
  @IsOptional()
  tutorId: string;

  @IsString()
  @IsNotEmpty()
  subjectName: string;

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
