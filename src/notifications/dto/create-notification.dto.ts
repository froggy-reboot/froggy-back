import { customBool } from 'src/utils/common/custom.enum';
import {
  Notification,
  notificationType,
} from '../entities/notification.entity';
import { User } from 'aws-sdk/clients/budgets';

export class CreateNotificationDto {
  type: notificationType;

  targetTitle: string;

  content: string;

  writerId: number;

  targetUserId: number;

  targetPostId: number;
}
