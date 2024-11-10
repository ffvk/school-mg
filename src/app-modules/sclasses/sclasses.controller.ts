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
import { RestrictSclassesGuard } from 'src/shared/guards/restrictors/restrict-sclasses/restrict-sclasses.guard';
import { SclassIdGuard } from 'src/shared/guards/validators/sclass-id/sclass-id.guard';
import { CreateSclassDTO } from './dtos/create-sclass.dto/create-sclass.dto';
import { DeleteSclassDTO } from './dtos/delete-sclass.dto/delete-sclass.dto';
import { GetSclassesDTO } from './dtos/get-sclasses.dto/get-sclasses.dto';
import { UpdateSclassDTO } from './dtos/update-sclass.dto/update-sclass.dto';
import { SclassesService } from './sclasses.service';

@Controller('sclasses')
export class SclassesController {
  constructor(private readonly sclassesService: SclassesService) {}

  @Get()
  @UseGuards(RestrictSclassesGuard)
  async getSclasses(@Query() getSclassesDTO: GetSclassesDTO) {
    return await this.sclassesService.get(getSclassesDTO);
  }

  @Post()
  @UseGuards()
  async createSclass(@Body() createSclassDTO: CreateSclassDTO) {
    return await this.sclassesService.create(createSclassDTO);
  }

  @Put()
  @UseGuards(SclassIdGuard)
  async updateSclass(@Body() updateSclassDTO: UpdateSclassDTO) {
    return await this.sclassesService.update(updateSclassDTO);
  }

  @Delete()
  @UseGuards(SclassIdGuard)
  async deleteSclass(@Body() deleteSclassDTO: DeleteSclassDTO) {
    return await this.sclassesService.update(deleteSclassDTO);
  }

  //   @Delete('permanent')
  //   @UseGuards(SclassIdGuard)
  //   async deleteSclassPermanent(
  //     @Body('sclassId', ParseMongoIdPipe) sclassId: string,
  //   ) {
  //     return await this.sclassesService.delete(sclassId);
  //   }
}
