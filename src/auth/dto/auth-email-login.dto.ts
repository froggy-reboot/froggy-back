import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'hi' })
  @IsNotEmpty()
  password: string;
}
export class AuthEmailLoginResDto {
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  refreshToken: string;
}
