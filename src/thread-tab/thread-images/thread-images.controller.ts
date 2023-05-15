import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThreadImagesService } from './thread-images.service';
import { CreateThreadImageDto } from './dto/create-thread-image.dto';
import { UpdateThreadImageDto } from './dto/update-thread-image.dto';

@Controller('thread-images')
export class ThreadImagesController {
  constructor(private readonly threadImagesService: ThreadImagesService) {}

  @Post()
  create(@Body() createThreadImageDto: CreateThreadImageDto) {
    return this.threadImagesService.create(createThreadImageDto);
  }

  @Get()
  findAll() {
    return this.threadImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadImageDto: UpdateThreadImageDto) {
    return this.threadImagesService.update(+id, updateThreadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadImagesService.remove(+id);
  }
}
