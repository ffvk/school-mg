import { OrderSchema } from './order.schema';

describe('OrderSchema', () => {
  it('should be defined', () => {
    expect(new OrderSchema()).toBeDefined();
  });
});
