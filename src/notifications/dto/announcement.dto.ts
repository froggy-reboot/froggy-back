import { CreateNotificationDto } from './create-notification.dto';
import {
  Notification,
  notificationType,
} from '../entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  targetPostId: number;

  static mapDTOToDomain(
    dto: CreateAnnouncementDto,
    userId,
    article,
  ): Notification {
    const domainNotification = new Notification();
    domainNotification.type = notificationType.announcement;
    domainNotification.targetTitle = article.title;

    domainNotification.content = article.content;
    domainNotification.writerId = article.writerId;
    domainNotification.targetPostId = dto.targetPostId;

    domainNotification.targetUserId = userId;
    return domainNotification;
  }
}
