import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubjectIdGuard } from 'src/shared/guards/validators/subject-id/subject-id.guard';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreateSubjectDTO } from './dtos/create-subject.dto/create-subject.dto';
import { GetSubjectsDTO } from './dtos/get-subjects.dto/get-subjects.dto';
import { UpdateSubjectDTO } from './dtos/update-subject.dto/update-subject.dto';
import { SubjectsService } from './subjects.service';
import { RestrictSubjectsGuard } from 'src/shared/guards/restrictors/restrict-subjects/restrict-subjects.guard';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @UseGuards(RestrictSubjectsGuard)
  async getSubjects(@Query() getSubjectsDTO: GetSubjectsDTO) {
    return await this.subjectsService.get(getSubjectsDTO);
  }

  @Post()
  async createSubject(@Body() createSubjectDTO: CreateSubjectDTO) {
    return await this.subjectsService.create(createSubjectDTO);
  }

  @Put()
  @UseGuards(SubjectIdGuard)
  async updateSubject(@Body() updateSubjectDTO: UpdateSubjectDTO) {
    return await this.subjectsService.update(updateSubjectDTO);
  }

  @Delete()
  @UseGuards(SubjectIdGuard)
  async deleteSubject(@Body('subjectId', ParseMongoIdPipe) subjectId: string) {
    return await this.subjectsService.delete(subjectId);
  }
}
