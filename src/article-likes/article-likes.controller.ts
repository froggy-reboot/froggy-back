import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';

@Controller('article-likes')
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @Post()
  create(@Body() createArticleLikeDto: CreateArticleLikeDto) {
    return this.articleLikesService.create(createArticleLikeDto);
  }

  @Get()
  findAll() {
    return this.articleLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleLikeDto: UpdateArticleLikeDto) {
    return this.articleLikesService.update(+id, updateArticleLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleLikesService.remove(+id);
  }
}
