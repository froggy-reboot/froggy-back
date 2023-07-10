import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserSmallProfileRes {
  @ApiProperty({ example: 'jerald' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  profileImg: string;
}
