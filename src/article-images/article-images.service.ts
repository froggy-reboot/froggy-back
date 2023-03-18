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

  create(createArticleImagePreDto: CreateArticleImagePreDto, file) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = file.location;
    const createArticleDto = createArticleImagePreDto;
    createArticleDto['url'] = path;
    return this.repository.save(this.repository.create(createArticleDto));
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
