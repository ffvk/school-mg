import { FileSchema } from './file.schema';

describe('FileSchema', () => {
  it('should be defined', () => {
    expect(new FileSchema()).toBeDefined();
  });
});
