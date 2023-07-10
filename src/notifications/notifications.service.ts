import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { customBool } from 'src/utils/common/custom.enum';
import { CreateAnnouncementDto } from './dto/announcement.dto';
import { ArticlesReadService } from 'src/article-tab/articles/services/articles.read.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private NotificationRepository: Repository<Notification>,
    private articleReadService: ArticlesReadService,
    private userService: UsersService,
  ) {}

  create(NotificationRepository: CreateNotificationDto) {
    return this.NotificationRepository.save(
      this.NotificationRepository.create(NotificationRepository),
    );
  }

  getUnreadNotificationsCount(userId) {
    return this.NotificationRepository.count({
      where: {
        targetUserId: userId,
        isRead: customBool.N,
      },
    });
  }

  async getNotifications(paginationOptions, userId) {
    const notificationResult =
      await this.NotificationRepository.createQueryBuilder('notification')
        .withDeleted()
        .leftJoin('notification.writerUser', 'writerUser')
        .where('notification.targetUserId = :userId', { userId: userId })
        .andWhere('notification.deletedAt is null')
        .select([
          'notification.id',
          'notification.type',
          'notification.targetTitle',
          'notification.content',
          'notification.createdAt',
          'notification.isRead',
          'notification.writerId',
          'notification.targetPostId',
          'writerUser.nickname',
          'writerUser.profileImg',
        ])
        .orderBy('notification.createdAt', 'DESC')
        .skip((paginationOptions.page - 1) * paginationOptions.limit)
        .take(paginationOptions.limit)
        .getMany();

    // const notificationForUpdate = notificationResult.map((notification) => {
    //   const newNotification = {
    //     id: notification.id,
    //     isRead: customBool.Y,
    //   };
    //   return newNotification;
    // });

    // await this.NotificationRepository.save(notificationForUpdate);
    return notificationResult;
  }
  readNotification(id: number) {
    return this.NotificationRepository.update(
      { id: id },
      { isRead: customBool.Y },
    );
  }

  async createAnnouncementNotification(
    createAnnouncementDto: CreateAnnouncementDto,
  ) {
    const targetArticle = await this.articleReadService.findOne(
      createAnnouncementDto.targetPostId,
    );

    const users = await this.userService.findAll();
    const notifications: Notification[] = [];

    for (let user of users) {
      const notification: Notification = CreateAnnouncementDto.mapDTOToDomain(
        createAnnouncementDto,
        user.id,
        targetArticle,
      );
      notifications.push(notification);
    }
    return this.NotificationRepository.save(
      this.NotificationRepository.create(notifications),
    );
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
