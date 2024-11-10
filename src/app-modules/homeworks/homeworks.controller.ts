import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ErrorConstant } from 'src/constants/error';
import { RestrictHomeworksGuard } from 'src/shared/guards/restrictors/restrict-homeworks/restrict-homeworks.guard';
import { HomeworkIdGuard } from 'src/shared/guards/validators/homework-id/homework-id.guard';
import { SubjectIdGuard } from 'src/shared/guards/validators/subject-id/subject-id.guard';
import { S3Service } from 'src/shared/helpers/s3/s3.service';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { SubjectsService } from '../subjects/subjects.service';
import { UsersService } from '../users/users.service';
import { CreateHomeworkDTO } from './dtos/create-homework.dto/create-homework.dto';
import { DeleteHomeworkDTO } from './dtos/delete-homework.dto/delete-homework.dto';
import { GetHomeworkDTO } from './dtos/get-homework.dto/get-homework.dto';
import { HomeworksService } from './homeworks.service';

@Controller('homeworks')
export class HomeworksController {
  constructor(
    private readonly homeworksService: HomeworksService,
    private readonly subjectsService: SubjectsService,
    private readonly s3Service: S3Service,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(RestrictHomeworksGuard)
  async getHomeworks(@Query() getHomeworksDTO: GetHomeworkDTO) {
    return await this.homeworksService.get(getHomeworksDTO);
  }

  @Post()
  @UseGuards(SubjectIdGuard)
  async createHomework(@Body() createHomeworkDTO: CreateHomeworkDTO) {
    const createdHomework = await this.homeworksService.create(
      createHomeworkDTO,
    );

    await this.subjectsService.update({
      subjectId: createHomeworkDTO.subjectId,
      status: 'IN_REVIEW',
    });

    let users = [];

    for (let user of users) {
      this.mailerService
        .sendMail({
          to: user.email.value,
          subject: 'We have a new Artwork Version created for you!',
          template: 'subject-version-created',
          context: {
            name: user.name,
            homeworkName: createdHomework.title,
            creatorId: createdHomework.creatorId,
            sclassId: createdHomework.sclassId,
            subjectId: createdHomework.subjectId,

            homeworkId: createdHomework._id,
            baseUrl: this.configService.get<string>('app.uiUrl'),
          },
        })
        .then(() => {
          console.log('sent email');
        })
        .catch((e: any) => {
          console.log('err sending email', e);
        });
    }

    return createdHomework;
  }

  @Delete()
  @UseGuards(HomeworkIdGuard)
  async deleteHomework(@Body() deleteHomeworkDTO: DeleteHomeworkDTO) {
    return await this.homeworksService.update(deleteHomeworkDTO);
  }

  @Delete('permanent')
  @UseGuards(HomeworkIdGuard)
  async deleteHomeworkPermanent(
    @Body('homeworkId', ParseMongoIdPipe) homeworkId: string,
  ) {
    return await this.homeworksService.delete(homeworkId);
  }

  @Post('file')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(
    @Body('homeworkId', ParseMongoIdPipe) homeworkId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!homeworkId) {
      throw new BadRequestException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: {
          field: 'homeworkId',
        },
      });
    }

    if (!Array.isArray(files) || !files.length) {
      throw new BadRequestException({
        error: ErrorConstant.MISSING_FIELD,
        msgVars: {
          field: 'file',
        },
      });
    }

    const file = files[0];

    let homeworkRes = await this.homeworksService.get({
      homeworkId,
    });

    if (!homeworkRes?.totalCount) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'homeworkId',
        },
      });
    }

    let homework = homeworkRes.homeworks[0];

    if (homework.file?.url) {
      const filename = homework.file.url.split(homeworkId + '/')[1];
      await this.s3Service.removeUploaded(homeworkId, filename);
    }

    const res = await this.s3Service.upload(homeworkId, file);

    return await this.homeworksService.update({
      homeworkId,
      file: {
        url: res?.Location,
        type: file.mimetype || '',
      },
    });
  }

  @Delete('file')
  async deleteUploadedFile(
    @Body('homeworkId', ParseMongoIdPipe) homeworkId: string,
  ) {
    let homeworkRes = await this.homeworksService.get({
      homeworkId,
    });

    if (!homeworkRes?.totalCount) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'homeworkId',
        },
      });
    }

    let homework = homeworkRes.homeworks[0];
    if (!homework?.file?.url) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'file',
        },
      });
    }

    const filename = homework.file.url.split(homeworkId + '/')[1];
    await this.s3Service.removeUploaded(homeworkId, filename);

    return await this.homeworksService.update({
      homeworkId,
      file: null,
    });
  }
}
