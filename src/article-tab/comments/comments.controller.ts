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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from '../articles/services/articles.service';
import { ShowArticlesDto } from '../articles/dto/show-article.dto';
import { ArticlesReadService } from '../articles/services/articles.read.service';
import { ReportCommentDto } from '../dto/comment-report.dto';

@ApiTags('내 댓글들')
@Controller({
  path: 'comments',
  version: '1',
})
export class MyCommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('my-comments/pages/:page')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Comment의 배열 json',
  })
  async findArticleByMe(
    @Param() paginationOptions: IPaginationOptions,
    @Request() req,
  ) {
    return this.commentsService.findCommentsByMe(
      paginationOptions,
      req.user.id,
    );
  }
}
@ApiTags('게시판 댓글')
@Controller({
  path: 'articles/:articleId/comments',
  version: '1',
})
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly articlesService: ArticlesService,
    private readonly articlesReadService: ArticlesReadService,
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
    const article = this.articlesReadService.findOne(articleId);
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
            msg: 'comment does not exist',
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

  @Post('report')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '댓글 신고하기',
    description: '댓글을 신고합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '신고 성공',
  })
  @ApiResponse({
    status: 404,
    description: '댓글이 존재하지 않는 경우',
  })
  async reportArticle(
    @Request() req,
    @Body() reportCommentDto: ReportCommentDto,
  ) {
    return this.commentsService.reportComment(reportCommentDto, req.user.id);
  }
}
