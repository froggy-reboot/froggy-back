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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticlesRepository } from './repository/article.repository';
import { ShowArticlesDto, ShowOneArticleDto } from './dto/show-article.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

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
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
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
    const userInfo = await this.usersService.findById(+article['writer_id']);
    article['user'] = userInfo;
    return article;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
    // When the (unary) + operator is applied to a string,
    // it tries to convert the string to a numeric value.
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
