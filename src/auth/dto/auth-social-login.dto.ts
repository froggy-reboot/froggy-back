import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
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

  @ApiProperty({ type: () => User })
  user: ShowUserDto;
}
export class AuthSocialLoginUrlDto {
  @ApiProperty({
    example: 'https://accounts.google.com/signin/oauth/error/v2....',
  })
  redirectUrl: string;
}
