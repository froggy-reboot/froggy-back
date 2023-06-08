import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findById(id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.id =:id', { id })
      .select('user.nickname as writerNickname')
      .select([
        'user.nickname as writerNickname',
        'user.profileImg as writerProfileImg',
      ])
      .getRawOne();
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProfileDto, file = null) {
    if (updateProfileDto.defaultImage === 'Y') {
      updateProfileDto.profileImg =
        'https://froggy-image.s3.ap-northeast-2.amazonaws.com/ad97e1f8-2565-4b2b-9555-046c5252ec77.png';
    } else if (file && file.location) {
      updateProfileDto.profileImg = file.location;
      console.log('#### file location: ', file.location);
    }
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
