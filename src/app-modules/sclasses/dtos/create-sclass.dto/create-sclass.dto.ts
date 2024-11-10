import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSclassDTO {
  @IsMongoId()
  tutorId: string;

  @IsMongoId()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  className: string;
}
