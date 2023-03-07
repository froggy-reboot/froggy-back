import { ApiProperty } from '@nestjs/swagger';
import { User } from 'aws-sdk/clients/budgets';
import { NumberCapabilityList } from 'aws-sdk/clients/sns';
import { IsNotEmpty } from 'class-validator';

export class AuthRavelryLoginDto {
  @ApiProperty({ example: 'kajljidgasdfagda' })
  @IsNotEmpty()
  jwtToken: string;

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
