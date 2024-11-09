import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private AWS_ACCESS_KEY_ID: string;
  private AWS_SECRET_ACCESS_KEY: string;
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.AWS_ACCESS_KEY_ID = this.configService.get<string>(
      'app.aws.s3.keys.accessKeyId',
    );

    this.AWS_SECRET_ACCESS_KEY = this.configService.get<string>(
      'app.aws.s3.keys.secretAccessKey',
    );

    this.s3 = new S3({
      accessKeyId: this.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
    });
  }

  async upload(directoryPath: string, file: any) {
    const { originalname } = file;

    const bucketS3: string = this.configService.get<string>(
      'app.aws.s3.buckets.mediaBucket',
    );

    const env: string = this.configService.get<string>('app.env');

    return await this.uploadS3(
      file.buffer,
      bucketS3,
      env + '/' + directoryPath + '/' + originalname,
      file.mimetype,
    );
  }

  private async uploadS3(
    fileStream: Buffer,
    bucket: string,
    name: string,
    mime: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name).replace(/\s/g, '-'),
      ContentType: mime,
      Body: fileStream,
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async removeUploaded(directoryPath: string, originalName: string) {
    const bucketS3: string = this.configService.get<string>(
      'app.aws.s3.buckets.imageBucket',
    );

    const env: string = this.configService.get<string>('app.env');

    return await this.removeFromS3(
      bucketS3,
      env + '/' + directoryPath + '/' + originalName,
    );
  }

  private async removeFromS3(bucket: string, name: string) {
    try {
      return await this.s3
        .deleteObject({
          Bucket: bucket,
          Key: String(name).replace(/\s/g, '-'),
        })
        .promise();
    } catch (e) {
      return e;
    }
  }
}
