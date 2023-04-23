import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleImagesService } from './article-images.service';
import { CreateArticleImageDto } from './dto/create-article-image.dto';
import { UpdateArticleImageDto } from './dto/update-article-image.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('게시판 사진')
@Controller({
  path: 'article-images',
  version: '1',
})
export class ArticleImagesController {
  constructor(private readonly articleImagesService: ArticleImagesService) {}

  @Post()
  create(@Body() createArticleImagesDto: CreateArticleImageDto) {
    // return this.articleImagesService.create(createArticleImagesDto, file);
  }

  @Get()
  findAll(@Param('articleId') articleId: string) {
    return this.articleImagesService.findAll(+articleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleImageDto: UpdateArticleImageDto,
  ) {
    return this.articleImagesService.update(+id, updateArticleImageDto);
  }

  @Delete('periodic')
  async removeMany() {
    const removeResult = await this.articleImagesService.removePeriodically();
    return removeResult;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleImagesService.remove(+id);
  }
}
