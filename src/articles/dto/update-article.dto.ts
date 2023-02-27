import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsNotEmpty()
  writer_id: number;

  @ApiProperty({ example: '0' })
  @IsOptional()
  @IsNotEmpty()
  liked: number;

  @ApiProperty({
    example: '변경된 제목입니다.',
  })
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '변경된 본문입니다.' })
  @IsOptional()
  @IsNotEmpty()
  content: string;
}
