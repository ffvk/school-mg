import { ProductSchema } from './product.schema';

describe('ProductSchema', () => {
  it('should be defined', () => {
    expect(new ProductSchema()).toBeDefined();
  });
});
