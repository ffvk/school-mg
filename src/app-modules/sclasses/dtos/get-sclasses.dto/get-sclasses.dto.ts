import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetSclassesDTO {
  @IsMongoId()
  @IsOptional()
  sclassId: string;

  @IsString()
  @IsOptional()
  sclassIds: string;

  @IsString()
  @IsOptional()
  tutorId: string;

  @IsString()
  @IsOptional()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  className: string;

  @IsOptional()
  @IsString()
  supportingFilesDielineType: string;
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
