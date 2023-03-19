import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticleImagesService } from 'src/article-images/article-images.service';
import { CreateArticleImageDto } from 'src/article-images/dto/create-article-image.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    private articleImagesService: ArticleImagesService,
  ) {}
  async create(createArticleDto: CreateArticleDto, file) {
    const result = await this.articleRepository.save(
      this.articleRepository.create(createArticleDto),
    );
    console.log(result);

    const createArticleImageDto: CreateArticleImageDto = {
      articleId: result.id,
      order: 1,
      url: file.location,
    };
    if (file) {
      this.articleImagesService.create(createArticleImageDto);
    }
    return result;
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.articleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit, // offset
      take: paginationOptions.limit, // limit
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.save(
      this.articleRepository.create({
        id,
        ...updateArticleDto,
      }),
    );
  }

  remove(id: number) {
    return this.articleRepository.delete({ id });
  }
}
