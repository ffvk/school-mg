import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  export class UpdateSubjectDTO {
    @IsMongoId()
    tutorId: string;
  
    @IsMongoId()
    sclassId: string;
  
    @IsString()
    @IsNotEmpty()
    subjectName: string;
  }
  