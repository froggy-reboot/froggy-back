import { enrollType } from '../../users/entities/user.entity';

export interface SocialInterface {
  // id: string;
  email?: string;
  enroll_type: enrollType;
  password: string;
}
