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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Article } from './entities/article.entity';
import { ArticlesRepository } from './repository/article.repository';

@ApiTags('게시판 글')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articlesRepository: ArticlesRepository,
  ) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiProperty({ type: IPaginationOptions })
  @ApiResponse({
    status: 200,
    description: 'Article의 배열 json',
  })
  findAll(@Body() paginationOptions: IPaginationOptions) {
    // return this.articlesService.findManyWithPagination(paginationOptions);
    return this.articlesRepository.findArticleList(paginationOptions);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Article,
  })
  findOne(@Param('id') id: string) {
    // return this.articlesService.findOne(+id);
    return this.articlesRepository.findArticle(+id);
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
