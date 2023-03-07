import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { SocialUsersService } from './social-users.service';
import { CreateSocialUserDto } from './dto/create-social-user.dto';
import { UpdateSocialUserDto } from './dto/update-social-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiTags('social-users')
@Controller({
  path: 'social-users',
  version: '1',
})
export class UsersController {
  constructor(private readonly socialUsersService: SocialUsersService) {}

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() createProfileDto: CreateUserDto) {
  //   return this.usersService.create(createProfileDto);
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.socialUsersService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateSocialUserDto,
  ) {
    return this.socialUsersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.socialUsersService.softDelete(id);
  }
}
