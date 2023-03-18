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
    private articleImagesRepository: Repository<ArticleImage>,
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
    return this.articleImagesRepository.save(
      this.articleImagesRepository.create(createArticleDto),
    );
  }

  findAll() {
    return `This action returns all articleImages`;
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
