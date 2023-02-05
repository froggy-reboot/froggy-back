import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { enrollType } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
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
}
