import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FileDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptional()
  size: number;

  @IsString()
  @IsOptional()
  type: string;
}
