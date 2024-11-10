import { Test, TestingModule } from '@nestjs/testing';
import { SclassesService } from './sclasses.service';

describe('SclassesService', () => {
  let service: SclassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SclassesService],
    }).compile();

    service = module.get<SclassesService>(SclassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
