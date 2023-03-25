import { ApiProperty } from '@nestjs/swagger';
import { User } from 'aws-sdk/clients/budgets';
import { NumberCapabilityList } from 'aws-sdk/clients/sns';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRavelryLoginDto {
  // @ApiProperty({ example: 'kajljidgasdfagda' })
  // @IsNotEmpty()
  // jwtToken: string;

  @ApiProperty({ example: '33' })
  @IsNotEmpty()
  socialUserId: number;
}
export class AuthRavelryLoginResDto {
  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  jwtToken: string;

  @ApiProperty({ example: '33' })
  @IsNotEmpty()
  user: User;
}

export class ravelryUserDto {
  about_me_html;
  about_me;
  fave_colors;
  fave_curse;
  first_name: string;

  @IsString()
  id: string;

  large_photo_url: string;
  location;
  pattern_author;
  photo_url: string;
  small_photo_url: string;
  tiny_photo_url: string;
  user_sites;
  username: string;
}
