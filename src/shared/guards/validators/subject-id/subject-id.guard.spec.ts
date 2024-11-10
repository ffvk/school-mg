import { SubjectIdGuard } from './subject-id.guard';

describe('SubjectIdGuard', () => {
  it('should be defined', () => {
    expect(new SubjectIdGuard()).toBeDefined();
  });
});
