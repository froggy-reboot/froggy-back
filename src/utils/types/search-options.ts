import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class SearchOptions {
  @ApiProperty({ example: '안뜨기' })
  @Type(() => String)
  @IsString()
  target: string;
}
