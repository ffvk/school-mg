import { OrderIdGuard } from './order-id.guard';

describe('OrderIdGuard', () => {
  it('should be defined', () => {
    expect(new OrderIdGuard()).toBeDefined();
  });
});
