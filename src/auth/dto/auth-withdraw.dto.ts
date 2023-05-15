import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthWithdrawDto {
  @ApiProperty({ example: '13' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'qwer1234',
  })
  @IsOptional()
  password?: string;
}
