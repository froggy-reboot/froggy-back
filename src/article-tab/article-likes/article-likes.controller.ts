import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleResDto } from '../articles/dto/create-article.dto';

@ApiTags('article 좋아요')
@Controller({
  path: 'article-likes',
  version: '1',
})
@Controller('article-likes')
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @Post('/:articleId')
  @ApiBearerAuth()
  @ApiResponse({
    description: 'affected row',
  })
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req, @Param('articleId') articleId: string) {
    const createArticleLikeDto: CreateArticleLikeDto = {
      articleId: +articleId,
      userId: req.user.id,
    };
    return await this.articleLikesService.toggleLike(createArticleLikeDto);
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
  update(
    @Param('id') id: string,
    @Body() updateArticleLikeDto: UpdateArticleLikeDto,
  ) {
    return this.articleLikesService.update(+id, updateArticleLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleLikesService.remove(+id);
  }
}
