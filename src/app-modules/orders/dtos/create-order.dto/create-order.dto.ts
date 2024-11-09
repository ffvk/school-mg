import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  productId: string;
}
