// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsEmail,
//   IsNotEmpty,
//   IsOptional,
//   MinLength,
//   Validate,
// } from 'class-validator';
// import { customBool } from 'src/ravelry-users/entities/ravelry-user.entity';
// import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
// import { enrollType } from '../entities/user.entity';

// export class CreateUserDto {
//   @ApiProperty({ example: 'test1@example.com' })
//   @IsNotEmpty()
//   @IsEmail()
//   @Validate(IsNotExist, ['User'], {
//     message: 'emailAlreadyExists',
//   })
//   email: string;

//   @ApiProperty({ example: 'qwer1234' })
//   @IsNotEmpty()
//   @MinLength(6)
//   password: string;

//   @ApiProperty({ example: 'local' })
//   @IsNotEmpty()
//   enrollType: enrollType;

//   @ApiProperty({ example: '멋진기린321' })
//   @IsNotEmpty()
//   nickname: string;

//   @IsOptional()
//   certifyHash?: string;

//   @IsOptional()
//   ravelryUserId?: number;

//   @IsOptional()
//   isCertified?: customBool;
// }
