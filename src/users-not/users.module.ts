// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { MulterModule } from '@nestjs/platform-express';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { multerOptionsFactory } from 'src/utils/common/multer.option';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     MulterModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: multerOptionsFactory,
//     }),
//   ],
//   controllers: [UsersController],
//   providers: [UsersService, ConfigModule, ConfigService],
//   exports: [UsersService],
// })
// export class UsersModule {}
