import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateThreadReqDto {
  @ApiProperty({ example: 'Dog Hat' })
  @IsNotEmpty()
  patternName: string;

  @ApiProperty({ example: '1112184' })
  @Type(() => Number)
  @IsNotEmpty()
  ravelryPatternId: number;

  @ApiProperty({ example: '스레드 글 작성했어요 ㅎㅎ' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '파일을 첨부해서 넣어주세요', required: false })
  files?: any;
}

export class CreateThreadDto {
  @IsNotEmpty()
  writerId?: number;

  @IsNotEmpty()
  patternId: number;

  @IsNotEmpty()
  content: string;
}
