import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  HttpException,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserReqDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    public configService: ConfigService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: User,
    description: 'user update 성공, user 객체 반환',
  })
  @ApiResponse({
    status: 406,
    description: 'jwt의 유저 정보와 변경을 위한 user 정보가 다른 경우',
  })
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserReqDto,
    @UploadedFile() file,
  ) {
    if (req.user.id !== id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          errors: {
            different: 'different user',
          },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this.usersService.update(id, updateProfileDto, file);
  }
}
