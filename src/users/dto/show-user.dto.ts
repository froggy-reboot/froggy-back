import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { enrollType, gender, role } from '../entities/user.entity';

export class ShowUserDto {
  @ApiProperty({ example: '32' })
  id: number;

  @ApiProperty({ example: 'frog123@google.com' })
  email?: string | null;

  @ApiProperty({ example: 'jerald' })
  @IsString()
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: '33' })
  @IsNumber()
  @IsOptional()
  age?: number | null;

  @ApiProperty({ example: 'local' })
  @IsNotEmpty()
  enrollType: enrollType;

  @ApiProperty({ type: Date })
  @IsDate()
  @IsOptional()
  birth?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(gender)
  gender?: gender | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  blogUrl?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(role)
  role?: role | null;
}
