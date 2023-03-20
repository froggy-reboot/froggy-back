import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('게시판 댓글')
@Controller({
  path: 'articles/:articleId/comments',
  version: '1',
})
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Param('articleId') articleId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UploadedFile() file,
  ) {
    createCommentDto.articleId = articleId;
    createCommentDto.writerId = req.user.id;
    return this.commentsService.create(createCommentDto, file);
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
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
