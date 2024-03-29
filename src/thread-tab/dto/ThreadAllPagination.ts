import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ThreadAllPaginationReq {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  limit: number = 20;
}

export class ThreadAllPaginationRes {
  @ApiProperty({ example: '2' })
  writerId: number;

  @ApiProperty({ example: '2' })
  patternId: number;

  @ApiProperty({ example: '상쾌한통닭123' })
  captainKnitter: string;

  @ApiProperty({ example: '123' })
  knittersCount: number;

  @ApiProperty({ example: '0' })
  liked: number;

  @ApiProperty({ example: '내용입니다.' })
  content: string;

  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  createdAt: Date;
}
