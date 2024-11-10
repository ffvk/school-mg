import { Module } from '@nestjs/common';
import { SclassesController } from './sclasses.controller';
import { SclassesService } from './sclasses.service';

@Module({
  controllers: [SclassesController],
  providers: [SclassesService]
})
export class SclassesModule {}
