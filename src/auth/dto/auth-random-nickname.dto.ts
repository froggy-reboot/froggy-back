import { ApiProperty } from '@nestjs/swagger';

export class AuthRandomNickNameResDto {
  @ApiProperty({ example: '피곤한기린22' })
  nickname: string;
}
