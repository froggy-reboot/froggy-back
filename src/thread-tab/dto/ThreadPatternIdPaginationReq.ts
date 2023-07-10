import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ThreadPatternIdPaginationReq {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  patternId: number;

  @Type(() => Number)
  @IsNumber()
  limit: number = 20;
}
