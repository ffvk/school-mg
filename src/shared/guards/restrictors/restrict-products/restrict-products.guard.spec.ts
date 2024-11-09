import { RestrictProductsGuard } from './restrict-products.guard';

describe('RestrictProductsGuard', () => {
  it('should be defined', () => {
    expect(new RestrictProductsGuard()).toBeDefined();
  });
});
