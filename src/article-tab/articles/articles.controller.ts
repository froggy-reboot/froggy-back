import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFiles,
  Query,
  NotFoundException,
  ForbiddenException,
  UploadedFile,
} from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import {
  CreateArticleDto,
  CreateArticleResDto,
} from './dto/create-article.dto';
import { UpdateArticleReqDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { ShowArticlesDto, ShowOneArticleDto } from './dto/show-article.dto';
import { UsersService } from '../../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  FilterOptions,
  articleTypes,
  filters,
} from '../../utils/types/filter-options';
import { UpdateUserReqDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CheckLikeInterceptor } from '../../utils/common/interceptors/ checkLike.interceptor';
import { ArticlesReadService } from './services/articles.read.service';
import { ReportArticleDto } from '../dto/article-report.dto';
import { ArticlesReportService } from './services/articles.report.service';

@ApiTags('게시판 글')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articlesReadService: ArticlesReadService,
    private readonly articleReportService: ArticlesReportService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    type: CreateArticleResDto,
    description: '글 작성 성공!',
  })
  create(
    @Request() req,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() files,
  ) {
    return this.articlesService.create(createArticleDto, files, req.user.id);
  }

  @Get('/pages/:page')
  @UseInterceptors(CheckLikeInterceptor)
  @ApiQuery({ name: 'filter', enum: filters, required: false })
  @ApiQuery({ name: 'articleType', enum: articleTypes, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  async findAllByFilter(
    @Param() paginationOptions: IPaginationOptions,
    @Query() filterOptions: FilterOptions,
    @Query('search') search: string,
  ) {
    return this.articlesReadService.findAllByFilter(
      paginationOptions,
      filterOptions,
      search,
    );
  }

  @Get('my-articles/pages/:page')
  @UseInterceptors(CheckLikeInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  async findArticleByMe(
    @Param() paginationOptions: IPaginationOptions,
    @Request() req,
  ) {
    return this.articlesReadService.findArticleByMe(
      paginationOptions,
      req.user.id,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ShowOneArticleDto,
  })
  @ApiResponse({
    status: 404,
    description: '글이 존재하지 않는 경우',
  })
  @UseInterceptors(CheckLikeInterceptor)
  async findOne(@Param('id') id: string) {
    const article = await this.articlesReadService.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    const userInfo = await this.usersService.findById(+article['writerId']);
    article['user'] = userInfo;
    return article;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: '글 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'jwt의 유저 정보와 글 작성자가 다른 경우',
  })
  @ApiResponse({
    status: 404,
    description: '글이 존재하지 않는 경우',
  })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleReqDto,
    @UploadedFiles() files,
  ) {
    const userId = req.user.id;
    const article = await this.articlesReadService.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    if (userId !== article['writerId']) {
      throw new ForbiddenException(
        `${id}번째 글에 대해 수정/삭제 권한이 없습니다.`,
      );
    }
    const result = await this.articlesService.update(
      +id,
      updateArticleDto,
      files,
    );
    return result;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '삭제 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'jwt의 유저 정보와 글 작성자가 다른 경우',
  })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    const article = await this.articlesReadService.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    if (userId !== article['writerId']) {
      throw new ForbiddenException(
        `${id}번째 글에 대해 수정/삭제 권한이 없습니다.`,
      );
    }
    const removeResult = await this.articlesService.remove(+id);
    return removeResult;
  }

  @Patch('user/photo/:id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '유저 프로필 사진 변경',
    description: '유저 프로필 사진을 변경합니다. (죄송합니다)',
  })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'user update 성공, user 객체 반환',
  })
  @ApiResponse({
    status: 406,
    description: 'jwt의 유저 정보와 변경을 위한 user 정보가 다른 경우',
  })
  updateUserPhoto(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserReqDto,
    @UploadedFile() file,
  ) {
    const userId = req.user.id;
    if (userId !== id) {
      throw new ForbiddenException(
        `${id}번째 유저에 대해 수정 권한이 없습니다.`,
      );
    }
    return this.usersService.update(id, updateProfileDto, file);
  }

  @Post('report')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '글 신고하기',
    description: '글을 신고합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '신고 성공',
  })
  @ApiResponse({
    status: 404,
    description: '글이 존재하지 않는 경우',
  })
  async reportArticle(
    @Request() req,
    @Body() reportArticleDto: ReportArticleDto,
  ) {
    return this.articleReportService.reportArticle(
      reportArticleDto,
      req.user.id,
    );
  }
}
