import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
export enum filters {
  recent = '최신',
  popular = '인기',
}

export enum articleTypes {
  all = '전체',
  question = '질문',
  free = '자유',
}

export class FilterOptions {
  @ApiProperty({ example: '최신 | 인기' })
  @IsEnum(filters)
  @IsOptional()
  filter?: filters;

  @ApiProperty({ example: '자유 | 질문 | 전체' })
  @IsEnum(articleTypes)
  @IsOptional()
  articleType?: articleTypes;
}
