import { PartialType } from '@nestjs/swagger';
import { CreateSocialUsersDto } from './create-social-user.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
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
import { customBool, gender, role } from '../entities/social-user.entity';

export class UpdateSocialUserDto {
  @ApiProperty({ example: 'jerald' })
  @IsString()
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: '33' })
  @IsNumber()
  @IsOptional()
  age?: number | null;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  raverly_id?: number | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  raverly_token?: string | null;

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
  blog_url?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(role)
  role?: role | null;

  @IsOptional()
  is_certified?: customBool;
}
