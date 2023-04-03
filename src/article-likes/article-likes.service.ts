import { Injectable } from '@nestjs/common';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleLike } from './entities/article-like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleLikesService {
  constructor(
    @InjectRepository(ArticleLike)
    private articleLikesRepository: Repository<ArticleLike>,
  ) {}
  create(createArticleLikeDto) {
    // TODO : 이미 좋아요를 눌렀는지 확인
    // TODO : 글 좋아요 개수 update 해야함
    return this.articleLikesRepository.save(
      this.articleLikesRepository.create(createArticleLikeDto),
    );
  }

  findAll() {
    return `This action returns all articleLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleLike`;
  }

  update(id: number, updateArticleLikeDto: UpdateArticleLikeDto) {
    return `This action updates a #${id} articleLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleLike`;
  }
}
