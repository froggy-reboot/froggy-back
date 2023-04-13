import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { customBool } from 'src/utils/common/custom.enum';

export class AuthCheckIsExistEmailDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;
}

export class AuthCheckIsExistEmailResDto {
  @ApiProperty({ example: 'Y' })
  isExistEmail: customBool;
}
