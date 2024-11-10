import { HomeworkIdGuard } from './homework-id.guard';

describe('HomeworkIdGuard', () => {
  it('should be defined', () => {
    expect(new HomeworkIdGuard()).toBeDefined();
  });
});
