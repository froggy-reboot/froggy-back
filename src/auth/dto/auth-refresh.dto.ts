import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class AuthRefreshDto {
  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  refreshToken: string;
}
export class AuthRefreshResDto {
  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  refreshToken: string;
}
