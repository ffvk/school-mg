import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSclassDTO {
  @IsMongoId()
  tutorId: string;

  @IsMongoId()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  className: string;
}
