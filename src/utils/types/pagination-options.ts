import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class IPaginationOptions {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
