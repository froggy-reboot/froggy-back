import { ApiProperty } from '@nestjs/swagger';

export class ShowPatternsDto {}

export class searchPatternResDto {
  @ApiProperty()
  patternName: string;
  @ApiProperty()
  ravelryPatternId: number;
}
