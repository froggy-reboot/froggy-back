import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
