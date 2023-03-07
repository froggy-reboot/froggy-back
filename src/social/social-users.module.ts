// import { Module } from '@nestjs/common';
// import { SocialUsersService } from './users.service';
// import { SocialUsersController } from './users.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { SocialUser } from './entities/social-user.entity';
// import { IsExist } from 'src/utils/validators/is-exists.validator';
// import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

// @Module({
//   imports: [TypeOrmModule.forFeature([SocialUser])],
//   controllers: [SocialUsersController],
//   providers: [IsExist, IsNotExist, SocialUsersService],
//   exports: [SocialUsersService],
// })
// export class SocialUsersModule {}
