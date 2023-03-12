import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

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
import { customBool, gender, role } from '../entities/user.entity';
import { Column } from 'typeorm';

export class UpdateUserDto {
  @ApiProperty({ example: 'jerald' })
  @IsString()
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: '33' })
  @IsNumber()
  @IsOptional()
  age?: number | null;

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

  @Column({ type: 'int', nullable: true })
  ravelryUserId?: number;

  @IsOptional()
  isCertified?: customBool;

  @IsOptional()
  isRavelryIntegrated?: customBool;

  @IsOptional()
  refreshToken?: string;
}
