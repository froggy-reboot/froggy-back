import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Repository } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

export class ShowArticlesDto {}
export class ShowOneArticleDto {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  writer_id: number;

  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  liked: number;

  @ApiProperty({
    example: 'synodic',
  })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '제목입니다. 안녕하세요 저는 뜨개질을 하기 어려워해요',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '본문입니다. 어떡하죠, 도와주세요.' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: [Comment],
  })
  comments: Repository<Comment>;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  comment_count: number;

  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  @IsDate()
  created_at: Date;
}
