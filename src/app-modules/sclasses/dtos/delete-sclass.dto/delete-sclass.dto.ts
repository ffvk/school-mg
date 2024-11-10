import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class DeleteSclassDTO {
  @IsMongoId()
  sclassId: string;

  @IsOptional()
  @IsBoolean()
  deleted: boolean = true;
}
