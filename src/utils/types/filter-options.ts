import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
export enum filters {
  question = '질문',
  free = '자유',
  popular = '인기',
}
export class FilterOptions {
  @ApiProperty({ example: '자유' })
  @IsEnum(filters)
  @IsOptional()
  filter?: filters;
}
