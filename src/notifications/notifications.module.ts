import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsController } from './notifications.controller';
import { UsersService } from 'src/users/users.service';
import { ArticlesReadService } from 'src/article-tab/articles/services/articles.read.service';
import { UsersModule } from 'src/users/users.module';
import { ArticlesModule } from 'src/article-tab/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    UsersModule,
    ArticlesModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
