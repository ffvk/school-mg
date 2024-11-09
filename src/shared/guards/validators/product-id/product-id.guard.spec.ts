import { ProductIdGuard } from './product-id.guard';

describe('ProductIdGuard', () => {
  it('should be defined', () => {
    expect(new ProductIdGuard()).toBeDefined();
  });
});
