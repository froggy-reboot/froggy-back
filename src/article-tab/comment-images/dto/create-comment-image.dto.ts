import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentImageDto {
  @ApiProperty({ example: '3' })
  commentId: number;

  @ApiProperty({
    example:
      'https://froggy-image.s3.amazonaws.com/acb7a789-7676-42af-a484-f88fe106b885.jpg',
  })
  url: string;
}
