import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(
      this.articleRepository.create(createArticleDto),
    );
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where :{ id: id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.save(
      this.articleRepository.create({
        id,
        ...updateArticleDto,
      }));;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
