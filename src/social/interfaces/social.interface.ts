import { enrollType } from '../../users/entities/user.entity';

export interface SocialInterface {
  email: string;
  enroll_type: enrollType;
  password: string;
  raverly_token?: string;
}
