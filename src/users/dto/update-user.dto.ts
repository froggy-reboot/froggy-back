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

  @ApiProperty({ example: '33' })
  @IsString()
  @IsOptional()
  nickname?: string;

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

  @Column({ type: 'int', nullable: true })
  ravelryUserId?: number;

  @IsOptional()
  isCertified?: customBool;

  @IsOptional()
  isRavelryIntegrated?: customBool;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  profileImg?: string;
}

export class UpdateUserReqDto {
  @ApiProperty({ example: '33' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsOptional()
  profileImg?: string;

  @ApiProperty({ example: 'Y', enum: customBool })
  @IsEnum(customBool)
  defaultImage?: customBool;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File;
}
