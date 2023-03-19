import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { articleType } from '../entities/article.entity';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  writer_id: number;

  @ApiProperty({ example: '자유' })
  @IsOptional()
  @IsNotEmpty()
  article_type: articleType;

  @ApiProperty({ example: '0' })
  @IsOptional()
  @IsNotEmpty()
  liked: number;

  @ApiProperty({
    example: '제목입니다. 안녕하세요 저는 뜨개질을 하기 어려워해요',
  })
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '본문입니다. 어떡하죠, 도와주세요.' })
  @IsOptional()
  @IsNotEmpty()
  content: string;
}
