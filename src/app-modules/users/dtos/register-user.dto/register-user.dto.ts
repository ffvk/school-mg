import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EmailDTO } from '../email.dto/email.dto';
import { UserRoleEnum } from 'src/constants/enum';

export class RegisterUserDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => EmailDTO)
  email: EmailDTO;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
