import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleImagePreDto {
  @ApiProperty({ example: '3' })
  articleId: number;

  @ApiProperty({ example: '7' })
  commentId?: number;

  @ApiProperty({ example: '3' })
  order: number;
}
export class CreateArticleImageDto {
  @ApiProperty({ example: '3' })
  articleId: number;

  @ApiProperty({ example: '7' })
  commentId?: number;

  @ApiProperty({ example: '3' })
  order: number;

  @ApiProperty({
    example:
      'https://froggy-image.s3.amazonaws.com/acb7a789-7676-42af-a484-f88fe106b885.jpg',
  })
  url: string;
}
