import { ApiProperty } from '@nestjs/swagger';
export enum filters {
  question = '질문',
  free = '자유',
  popular = '인기',
}
export class FilterOptions {
  @ApiProperty({ example: '자유' })
  filter: filters;
}
