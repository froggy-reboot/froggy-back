import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';

@ApiTags('게시판 댓글')
@Controller({
  path: 'articles/:articleId/comments',
  version: '1',
})
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('articleId') articleId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.article_id = articleId;
    return this.commentsService.create(createCommentDto);
  }

  @Get('/pages/:page')
  findAll(@Param('articleId') articleId: number, @Param('page') page: number) {
    const newPage: IPaginationOptions = new IPaginationOptions();
    newPage.page = page;
    return this.commentsService.findByArticleId(articleId, newPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
