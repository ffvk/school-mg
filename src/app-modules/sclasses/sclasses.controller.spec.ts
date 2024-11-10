import { Test, TestingModule } from '@nestjs/testing';
import { SclassesController } from './sclasses.controller';

describe('SclassesController', () => {
  let controller: SclassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SclassesController],
    }).compile();

    controller = module.get<SclassesController>(SclassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
