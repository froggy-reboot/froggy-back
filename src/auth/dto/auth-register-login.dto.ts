import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { enrollType } from 'src/users/entities/user.entity';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: enrollType, example: 'local' })
  @IsNotEmpty()
  @IsEnum(enrollType)
  enrollType: enrollType;
}
