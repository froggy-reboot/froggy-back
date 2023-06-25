import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class IPaginationOptions {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  limit: number = 20;
}
export class ThreadPatternIdPaginationReq {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  patternId: number;

  @Type(() => Number)
  @IsNumber()
  limit: number = 20;
}
