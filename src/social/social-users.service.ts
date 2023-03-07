// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityCondition } from 'src/utils/types/entity-condition.type';
// import { IPaginationOptions } from 'src/utils/types/pagination-options';
// import { Repository } from 'typeorm';
// import { CreateSocialUserDto } from './dto/create-social-user.dto';
// import { UpdateSocialUserDto } from './dto/update-social-user.dto';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   create(createProfileDto: CreateSocialUserDto) {
//     return this.usersRepository.save(
//       this.usersRepository.create(createProfileDto),
//     );
//   }

//   findManyWithPagination(paginationOptions: IPaginationOptions) {
//     return this.usersRepository.find({
//       skip: (paginationOptions.page - 1) * paginationOptions.limit,
//       take: paginationOptions.limit,
//     });
//   }

//   findOne(fields: EntityCondition<User>) {
//     return this.usersRepository.findOne({
//       where: fields,
//     });
//   }

//   update(id: number, updateProfileDto: UpdateSocialUserDto) {
//     return this.usersRepository.save(
//       this.usersRepository.create({
//         id,
//         ...updateProfileDto,
//       }),
//     );
//   }

//   async softDelete(id: number): Promise<void> {
//     await this.usersRepository.softDelete(id);
//   }
// }
