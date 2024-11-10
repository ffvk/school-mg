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
import { SubjectsService } from './subjects.service';
import { GetSubjectsDTO } from './dtos/get-subjects.dto/get-subjects.dto';
import { CreateSubjectDTO } from './dtos/create-subject.dto/create-subject.dto';
import { SubjectIdGuard } from 'src/shared/guards/validators/subject-id/subject-id.guard';
import { UpdateSubjectDTO } from './dtos/update-subject.dto/update-subject.dto';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @UseGuards()
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
