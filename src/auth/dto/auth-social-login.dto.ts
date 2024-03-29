import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { Tokens } from 'src/social/tokens';
import { ShowUserDto } from 'src/users/dto/show-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthProvidersEnum } from '../auth-providers.enum';

export class AuthSocialLoginDto {
  @Allow()
  @ApiProperty({ type: () => Tokens })
  tokens: Tokens;

  @ApiProperty({ enum: AuthProvidersEnum })
  @IsNotEmpty()
  socialType: AuthProvidersEnum;

  @Allow()
  @ApiProperty({ required: false })
  firstName?: string;

  @Allow()
  @ApiProperty({ required: false })
  lastName?: string;
}

export class AuthSocialLoginResDto {
  @ApiProperty({ example: 'adkhgddfasajfkljfdka' })
  jwtToken: string;

  @ApiProperty({ example: 'adkhgddfasajfkljfdka' })
  refreshToken: string;

  @ApiProperty({ type: () => User })
  user: ShowUserDto;
}

export class AuthSocialLoginUrlDto {
  @ApiProperty({
    example: 'https://accounts.google.com/signin/oauth/error/v2....',
  })
  redirectUrl: string;
}
export class AuthSocialLoginIngDto {
  @ApiProperty({
    example: '33',
  })
  @IsNumber()
  userId: number;
}
