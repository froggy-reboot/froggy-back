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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  CreateArticleResDto,
} from './dto/create-article.dto';
import { UpdateArticleReqDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticlesRepository } from './repository/article.repository';
import { ShowArticlesDto, ShowOneArticleDto } from './dto/show-article.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SearchOptions } from 'src/utils/types/search-options';
import { FilterOptions } from '../utils/types/filter-options';
import { CheckLikeInterceptor } from '../utils/common/interceptors/ checkLike.interceptor';

@ApiTags('게시판 글')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService,
    private readonly articlesRepository: ArticlesRepository,
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
    createArticleDto.writerId = req.user.id;
    return this.articlesService.create(createArticleDto, files);
  }

  @Get('/pages/:page')
  @UseInterceptors(CheckLikeInterceptor)
  @ApiProperty({ type: IPaginationOptions })
  // @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  findAllByFilter(
    @Request() req,
    @Param() paginationOptions: IPaginationOptions,
    @Query() filterOptions: FilterOptions,
  ) {
    if (filterOptions.filter === undefined) {
      return this.articlesRepository.findArticleList(paginationOptions);
    } else if (filterOptions.filter == '인기') {
      return this.articlesRepository.findArticleListByHot(paginationOptions);
    } else {
      return this.articlesRepository.findArticleListByFilter(
        paginationOptions,
        filterOptions.filter,
      );
    }
  }

  @Get('/pages/:page')
  @ApiProperty({ type: IPaginationOptions })
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  findAll(@Param() paginationOptions: IPaginationOptions) {
    return this.articlesRepository.findArticleList(paginationOptions);
  }

  @Get('/search/:page')
  @ApiProperty({ type: IPaginationOptions })
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  @UseInterceptors(CheckLikeInterceptor)
  search(
    @Param() paginationOptions: IPaginationOptions,
    @Query() searchTarget: SearchOptions,
  ) {
    return this.articlesRepository.findSearchArticleList(
      searchTarget.target,
      paginationOptions,
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
    const article = await this.articlesRepository.findArticle(+id);
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
    const article = await this.articlesRepository.findArticle(+id);
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
    const article = await this.articlesRepository.findArticle(+id);
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
}
