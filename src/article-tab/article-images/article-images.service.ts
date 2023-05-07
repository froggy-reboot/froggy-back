import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleImageDto } from './dto/create-article-image.dto';
import { UpdateArticleImageDto } from './dto/update-article-image.dto';
import { ArticleImage } from './entities/article-image.entity';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleImagesService {
  constructor(
    @InjectRepository(ArticleImage)
    private repository: Repository<ArticleImage>,
    private configService: ConfigService,
  ) {}

  create(createArticleImageDto: CreateArticleImageDto) {
    return this.repository.save(this.repository.create(createArticleImageDto));
  }

  findAll(articleId: number) {
    const images = this.repository
      .createQueryBuilder('articleImage')
      .where('articleImage.articleId = :articleId', { articleId: articleId })
      .select(['articleImage'])
      .getMany();
    // console.log(articles);
    return images;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleImage`;
  }

  update(id: number, updateArticleImageDto: UpdateArticleImageDto) {
    return this.repository.save(
      this.repository.create({
        id,
        ...updateArticleImageDto,
      }),
    );
  }

  remove(id: number) {
    const image = this.repository.softDelete({
      id: id,
    });

    return this.repository.softDelete({ id });
  }

  async removeMany(ids: number[]) {
    const idsString = ids.map((id) => id.toString());
    const images = await this.repository
      .createQueryBuilder('articleImage')
      .softDelete()
      .from('articleImage')
      .where('id In(:id)', {
        id: idsString,
      })
      .execute();

    return images;
  }

  async removePeriodically() {
    const deletedAtThreshold = new Date();
    deletedAtThreshold.setDate(deletedAtThreshold.getDate() - 7);
    console.log('deletedAtThreshold', deletedAtThreshold);
    const images = await this.repository
      .createQueryBuilder('articleImage')
      .withDeleted()
      .where('articleImage.deletedAt < :threshold', {
        threshold: deletedAtThreshold,
      })
      .getMany();
    for (let image of images) {
      //s3 버킷에서 삭제하는 로직
      const key = image.url.split('/').pop();
      console.log('key', key);
      const s3 = new AWS.S3();
      const deleteParams = {
        Bucket: this.configService.get('file.awsDefaultS3Bucket'),
        Key: key,
      };
      await s3.deleteObject(deleteParams).promise();

      const deleteResult = await this.repository
        .createQueryBuilder('articleImage')
        .delete()
        .from('articleImage')
        .where('id = :id', {
          id: image.id,
        })
        .execute();
    }
    return images;
  }
}
