export class Product extends Document {
  productId: string;

  name: string;

  description?: string;

  price: number;

  timestamp: { createdAt: number; updatedAt: number };
}
