import { ApiProperty } from '@nestjs/swagger';
import { customBool } from 'src/utils/common/custom.enum';

export class AuthRandomNicknameResDto {
  @ApiProperty({ example: '피곤한기린22' })
  nickname: string;
}

export class AuthCheckNicknameReqDto {
  @ApiProperty({ example: '피곤한기린22' })
  nickname: string;
}

export class AuthCheckNicknameResDto {
  @ApiProperty({ example: 'Y' })
  isExistNickname: customBool;
}
