import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentImagesService } from './comment-images.service';
import { CreateCommentImageDto } from './dto/create-comment-image.dto';
import { UpdateCommentImageDto } from './dto/update-comment-image.dto';

@Controller('comment-images')
export class CommentImagesController {
  constructor(private readonly commentImagesService: CommentImagesService) {}

  // @Post()
  // create(@Body() createCommentImageDto: CreateCommentImageDto) {
  //   return this.commentImagesService.create(createCommentImageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.commentImagesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentImagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentImageDto: UpdateCommentImageDto) {
  //   return this.commentImagesService.update(+id, updateCommentImageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentImagesService.remove(+id);
  // }
}
