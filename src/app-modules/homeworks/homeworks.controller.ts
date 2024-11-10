import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ErrorConstant } from 'src/constants/error';
import { RestrictHomeworksGuard } from 'src/shared/guards/restrictors/restrict-homeworks/restrict-homeworks.guard';
import { HomeworkIdGuard } from 'src/shared/guards/validators/homework-id/homework-id.guard';
import { S3Service } from 'src/shared/helpers/s3/s3.service';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreateHomeworkDTO } from './dtos/create-homework.dto/create-homework.dto';
import { DeleteHomeworkDTO } from './dtos/delete-homework.dto/delete-homework.dto';
import { GetHomeworkDTO } from './dtos/get-homework.dto/get-homework.dto';
import { HomeworksService } from './homeworks.service';
import { UpdateHomeworkDTO } from './dtos/update-homework.dto/update-homework.dto';

@Controller('homeworks')
export class HomeworksController {
  constructor(
    private readonly homeworksService: HomeworksService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  @UseGuards(RestrictHomeworksGuard)
  async getHomeworks(@Query() getHomeworksDTO: GetHomeworkDTO) {
    return await this.homeworksService.get(getHomeworksDTO);
  }

  @Post()
  async createHomework(@Body() createHomeworkDTO: CreateHomeworkDTO) {
    return await this.homeworksService.create(createHomeworkDTO);
  }

  @Put()
  @UseGuards(HomeworkIdGuard)
  async updateHomework(@Body() updateHomeworkDTO: UpdateHomeworkDTO) {
    return await this.homeworksService.update(updateHomeworkDTO);
  }

  @Delete()
  @UseGuards(HomeworkIdGuard)
  async deleteHomework(
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
