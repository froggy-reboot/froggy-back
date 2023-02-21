import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthCheckIsExistEmailDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;
}

export class AuthCheckIsExistEmailResDto {
  @ApiProperty({ example: 'Y' })
  isExistEmail: string;
}
