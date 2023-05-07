import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThreadCommentsService } from './thread-comments.service';
import { CreateThreadCommentDto } from './dto/create-thread-comment.dto';
import { UpdateThreadCommentDto } from './dto/update-thread-comment.dto';

@Controller('thread-comments')
export class ThreadCommentsController {
  constructor(private readonly threadCommentsService: ThreadCommentsService) {}

  @Post()
  create(@Body() createThreadCommentDto: CreateThreadCommentDto) {
    return this.threadCommentsService.create(createThreadCommentDto);
  }

  @Get()
  findAll() {
    return this.threadCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadCommentDto: UpdateThreadCommentDto) {
    return this.threadCommentsService.update(+id, updateThreadCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadCommentsService.remove(+id);
  }
}
