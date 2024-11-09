import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDTO {
  @IsMongoId()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
