import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'leedasom' })
  name: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty({ example: 'froggy2bute123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
