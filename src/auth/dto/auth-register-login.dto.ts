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
import { enrollType } from 'src/users/entities/user.entity';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  enroll_type: enrollType;
}
