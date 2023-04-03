import { Injectable } from '@nestjs/common';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';

@Injectable()
export class ArticleLikesService {
  create(createArticleLikeDto: CreateArticleLikeDto) {
    return 'This action adds a new articleLike';
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
