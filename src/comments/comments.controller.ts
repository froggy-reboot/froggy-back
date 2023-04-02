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
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from '../articles/articles.service';

@ApiTags('게시판 댓글')
@Controller({
  path: 'articles/:articleId/comments',
  version: '1',
})
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly articlesService: ArticlesService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: '댓글 작성 성공',
  })
  @ApiResponse({
    status: 422,
    description: '글이 존재하지 않습니다.',
  })
  async create(
    @Request() req,
    @Param('articleId') articleId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UploadedFile() file,
  ) {
    createCommentDto.articleId = articleId;
    createCommentDto.writerId = req.user.id;
    const article = this.articlesService.findOne(articleId);
    if (article == null) {
      throw new ForbiddenException(
        `${articleId} 번째 글은 삭제되었거나, 없는 글입니다.`,
      );
    }
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
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
  })
  @ApiResponse({
    status: 406,
    description: 'jwt의 유저 정보와 댓글 작성자가 다른 경우',
  })
  @ApiResponse({
    status: 400,
    description: '댓글이 존재하지 않는 경우',
  })
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.findOne(+id);
    if (!comment) {
      throw new HttpException(
        {
          status: 400,
          errors: {
            msg: 'comment is not exist',
          },
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (comment.writerId !== req.user.id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          errors: {
            msg: 'different user',
          },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '삭제 성공',
  })
  @ApiResponse({
    status: 406,
    description: 'jwt의 유저 정보와 댓글 작성자가 다른 경우',
  })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req) {
    const comment = await this.commentsService.findOne(+id);
    if (comment.writerId !== req.user.id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          errors: {
            msg: 'different user',
          },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this.commentsService.remove(+id);
  }
}
