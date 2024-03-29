import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Repository } from 'typeorm';
import { CreateRavelryUserDto } from './dto/create-ravelry-user.dto';
import { UpdateRavelryUserDto } from './dto/update-ravelry-user.dto';
import { RavelryUser } from './entities/ravelry-user.entity';

@Injectable()
export class RavelryUsersService {
  constructor(
    @InjectRepository(RavelryUser)
    private ravelryUsersRepository: Repository<RavelryUser>,
  ) {}
  create(createRavelryUserDto: CreateRavelryUserDto) {
    return this.ravelryUsersRepository.save(
      this.ravelryUsersRepository.create(createRavelryUserDto),
    );
  }

  findAll() {
    return `This action returns all ravelryUsers`;
  }

  findOne(fields: EntityCondition<RavelryUser>) {
    return this.ravelryUsersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateRavelryUserDto: UpdateRavelryUserDto) {
    return `This action updates a #${id} ravelryUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} ravelryUser`;
  }
}
