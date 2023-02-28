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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@ApiTags('게시판')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Repository<Article>,
    description:
      '[\n' +
      '    {\n' +
      '        "id": 11,\n' +
      '        "writer_id": 2,\n' +
      '        "liked": 0,\n' +
      '        "nickname": "",\n' +
      '        "title": "제목입니다.2 안녕하세요 저는 트위치에서 방송을 하고 있는",\n' +
      '        "content": "본문입니다. 개입입맨입니다..",\n' +
      '        "created_at": "2023-02-27T05:27:50.505Z",\n' +
      '        "deleted_at": null,\n' +
      '        "__entity": "Article"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 12,\n' +
      '        "writer_id": 2,\n' +
      '        "liked": 0,\n' +
      '        "nickname": "",\n' +
      '        "title": "제목입니다.3 안녕하세요 저는 트위치에서 방송을 하고 있는",\n' +
      '        "content": "본문입니다. 개입입맨입니다..",\n' +
      '        "created_at": "2023-02-27T05:28:03.321Z",\n' +
      '        "deleted_at": null,\n' +
      '        "__entity": "Article"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 13,\n' +
      '        "writer_id": 2,\n' +
      '        "liked": 0,\n' +
      '        "nickname": "",\n' +
      '        "title": "제목입니다.4 안녕하세요 저는 트위치에서 방송을 하고 있는",\n' +
      '        "content": "본문입니다. 개입입맨입니다..",\n' +
      '        "created_at": "2023-02-27T05:28:33.538Z",\n' +
      '        "deleted_at": null,\n' +
      '        "__entity": "Article"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 14,\n' +
      '        "writer_id": 2,\n' +
      '        "liked": 0,\n' +
      '        "nickname": "",\n' +
      '        "title": "제목입니다.5 안녕하세요 저는 트위치에서 방송을 하고 있는",\n' +
      '        "content": "본문입니다. 개입입맨입니다..",\n' +
      '        "created_at": "2023-02-27T05:28:37.197Z",\n' +
      '        "deleted_at": null,\n' +
      '        "__entity": "Article"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 15,\n' +
      '        "writer_id": 2,\n' +
      '        "liked": 0,\n' +
      '        "nickname": "",\n' +
      '        "title": "제목입니다.6 안녕하세요 저는 트위치에서 방송을 하고 있는",\n' +
      '        "content": "본문입니다. 개입입맨입니다..",\n' +
      '        "created_at": "2023-02-27T05:28:40.758Z",\n' +
      '        "deleted_at": null,\n' +
      '        "__entity": "Article"\n' +
      '    }\n' +
      ']',
  })
  findAll(@Body() paginationOptions: IPaginationOptions) {
    return this.articlesService.findManyWithPagination(paginationOptions);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Article,
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
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
