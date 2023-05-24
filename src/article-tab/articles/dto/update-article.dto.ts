import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { articleType } from '../entities/article.entity';
import { Type } from 'class-transformer';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  writerId: number;

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

export class UpdateArticleReqDto {
  @ApiProperty({
    example: '제목입니다. 안녕하세요 저는 뜨개질을 하기 어려워해요',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '본문입니다. 어떡하죠, 도와주세요.' })
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: '[25, 26]',
  })
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsOptional()
  deleteImageIdList?: number[];

  @IsOptional()
  @ApiPropertyOptional({
    example: `'[
  {
    "imgUrl": "https://froggy-image.s3.ap-northeast-2.amazonaws.com/507f5b3b-3036-4fad-981c-c3cd74c6e1ec.png",
    "id": 60,
    "type": "existing"
  },
  {
    "type": "new"
  },
  {
    "type": "new"
  }]'`,
  })
  photoOrderList?: string;
}
