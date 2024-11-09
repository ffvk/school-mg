import { Module } from '@nestjs/common';
import { HelperService } from './helpers/helper/helper.service';
import { S3Service } from './helpers/s3/s3.service';

@Module({
  providers: [HelperService, S3Service],
  exports: [HelperService, S3Service],
})
export class SharedModule {}
