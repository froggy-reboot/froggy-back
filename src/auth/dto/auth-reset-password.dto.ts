import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResetPasswordReqDto {
  @ApiProperty({ example: 'test@froggy.com' })
  @IsNotEmpty()
  email: string;
}
export class AuthResetPasswordDto {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  hash: string;
}
