import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Request,
  HttpException,
  UploadedFiles,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  CreateArticleResDto,
} from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
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
  @ApiProperty({ type: IPaginationOptions })
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  findAll(@Param() paginationOptions: IPaginationOptions) {
    // return this.articlesService.findManyWithPagination(paginationOptions);
    return this.articlesRepository.findArticleList(paginationOptions);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ShowOneArticleDto,
  })
  async findOne(@Param('id') id: string) {
    // return this.articlesService.findOne(+id);
    const article = await this.articlesRepository.findArticle(+id);
    if (article == null || article == undefined) {
      return {
        status: 400,
        msg: `${id}는 삭제되었거나, 없는 글입니다.`,
      };
    }
    const userInfo = await this.usersService.findById(+article['writerId']);
    article['user'] = userInfo;
    return article;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: '글 수정 성공',
  })
  @ApiResponse({
    status: 406,
    description: 'jwt의 유저 정보와 글 작성자가 다른 경우',
  })
  @ApiResponse({
    status: 400,
    description: '글이 존재하지 않는 경우',
  })
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articlesService.findOne(+id);
    if (article.writerId !== req.user.id) {
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
    return this.articlesService.update(+id, updateArticleDto);
    // When the (unary) + operator is applied to a string,
    // it tries to convert the string to a numeric value.
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req) {
    return this.articlesService.remove(+id);
  }
}
