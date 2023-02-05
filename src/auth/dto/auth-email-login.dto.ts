import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test@example.com' })
  // 자동으로 스웨거에 등록하는 데코레이터

  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'hi' })
  @IsNotEmpty()
  password: string;
}
