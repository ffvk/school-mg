import { RestrictSubjectsGuard } from './restrict-subjects.guard';

describe('RestrictSubjectsGuard', () => {
  it('should be defined', () => {
    expect(new RestrictSubjectsGuard()).toBeDefined();
  });
});
