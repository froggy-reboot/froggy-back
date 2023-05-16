import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { Article, articleType } from '../entities/article.entity';

export class CreateArticleDto {
  @ApiProperty({ example: '자유' })
  @IsNotEmpty()
  articleType: articleType;

  @ApiProperty({
    example: '제목입니다. 안녕하세요 저는 뜨개질을 하기 어려워해요',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '본문입니다. 어떡하죠, 도와주세요.' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '파일을 첨부해서 넣어주세요' })
  files: any;

  static mapDTOToDomain(dto: CreateArticleDto, userId): Article {
    const domainArticle = new Article();
    domainArticle.writerId = userId;
    domainArticle.articleType = dto.articleType;
    domainArticle.title = dto.title;
    domainArticle.content = dto.content;
    return domainArticle;
  }
}

export class CreateArticleResDto {
  @ApiProperty({ example: '1' })
  writerId?: number;

  @ApiProperty({ example: '자유' })
  @IsNotEmpty()
  articleType: articleType;

  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  liked: number;

  @ApiProperty({
    example: '제목입니다. 안녕하세요 저는 뜨개질을 하기 어려워해요',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '본문입니다. 어떡하죠, 도와주세요.' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '파일을 첨부해서 넣어주세요' })
  files: any;
}
