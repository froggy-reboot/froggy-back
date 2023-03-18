import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import {
  CreateArticleImageDto,
  CreateArticleImagePreDto,
} from './dto/create-article-image.dto';
import { UpdateArticleImageDto } from './dto/update-article-image.dto';
import { ArticleImage } from './entities/article-image.entity';

@Injectable()
export class ArticleImagesService {
  constructor(
    @InjectRepository(ArticleImage)
    private repository: Repository<ArticleImage>,
  ) {}

  create(createArticleImageDto: CreateArticleImageDto) {
    return this.repository.save(this.repository.create(createArticleImageDto));
  }

  findAll(articleId: number) {
    const images = this.repository
      .createQueryBuilder('articleImage')
      .leftJoin('article.images', 'image')
      .select(['article', 'user.nickname'])
      .leftJoin('article.comments', 'comment')
      .loadRelationCountAndMap('article.comment_count', 'article.comments')
      .getMany();
    // console.log(articles);
    return images;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleImage`;
  }

  update(id: number, updateArticleImageDto: UpdateArticleImageDto) {
    return `This action updates a #${id} articleImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleImage`;
  }
}
