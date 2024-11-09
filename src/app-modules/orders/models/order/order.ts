export class Order extends Document {
  orderId: string;

  userId: string;

  productId: string;

  name: string;

  timestamp: { createdAt: number; updatedAt: number };
}
