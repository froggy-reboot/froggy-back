import { Injectable } from '@nestjs/common';
import { CreateRavelryUserDto } from './dto/create-ravelry-user.dto';
import { UpdateRavelryUserDto } from './dto/update-ravelry-user.dto';

@Injectable()
export class RavelryUsersService {
  create(createRavelryUserDto: CreateRavelryUserDto) {
    return 'This action adds a new ravelryUser';
  }

  findAll() {
    return `This action returns all ravelryUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ravelryUser`;
  }

  update(id: number, updateRavelryUserDto: UpdateRavelryUserDto) {
    return `This action updates a #${id} ravelryUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} ravelryUser`;
  }
}
