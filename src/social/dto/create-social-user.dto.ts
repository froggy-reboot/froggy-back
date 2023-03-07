import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateSocialUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['SocialUsers'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'local' })
  @IsNotEmpty()
  enroll_type: enrollType;

  @ApiProperty({ example: '멋진기린321' })
  @IsNotEmpty()
  nickname: string;

  @IsOptional()
  certify_hash?: string;
}
