import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RavelryUsersService } from './ravelry-users.service';
import { CreateRavelryUserDto } from './dto/create-ravelry-user.dto';
import { UpdateRavelryUserDto } from './dto/update-ravelry-user.dto';

@Controller('ravelry-users')
export class RavelryUsersController {
  constructor(private readonly ravelryUsersService: RavelryUsersService) {}

  @Post()
  create(@Body() createRavelryUserDto: CreateRavelryUserDto) {
    return this.ravelryUsersService.create(createRavelryUserDto);
  }

  @Get()
  findAll() {
    return this.ravelryUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ravelryUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRavelryUserDto: UpdateRavelryUserDto) {
    return this.ravelryUsersService.update(+id, updateRavelryUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ravelryUsersService.remove(+id);
  }
}
