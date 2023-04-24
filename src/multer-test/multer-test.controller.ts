import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MulterTestService } from './multer-test.service';
import { CreateMulterTestDto } from './dto/create-multer-test.dto';
import { UpdateMulterTestDto } from './dto/update-multer-test.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller({
  path: 'multer-test',
  version: '1',
})
export class MulterTestController {
  constructor(private readonly multerTestService: MulterTestService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  create(@UploadedFiles() files) {
    console.log(files);
    return true;
  }

  @Get()
  findAll() {
    return this.multerTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multerTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMulterTestDto: UpdateMulterTestDto,
  ) {
    return this.multerTestService.update(+id, updateMulterTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multerTestService.remove(+id);
  }
}
