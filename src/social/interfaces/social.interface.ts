import { customBool } from 'src/ravelry-users/entities/ravelry-user.entity';
import { enrollType } from '../../users/entities/user.entity';

export interface SocialInterface {
  email: string;
  enrollType: enrollType;
  password: string;
  isRavelryIntegrated?: customBool;
  ravelryUserId?: number;
}
