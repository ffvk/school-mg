import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class DeleteHomeworkDTO {
  @IsMongoId()
  homeworkId: string;

  @IsOptional()
  @IsBoolean()
  deleted: boolean = true;
}
