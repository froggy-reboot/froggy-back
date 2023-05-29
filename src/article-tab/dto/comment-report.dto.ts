import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReportCommentDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  commentId: number;

  @ApiProperty({ example: '욕설을 사용했습니다!!!' })
  @IsOptional()
  reason: string;
}
