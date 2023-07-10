import { User } from 'src/users/entities/user.entity';
import { customBool } from 'src/utils/common/custom.enum';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum notificationType {
  comment = '댓글',
  announcement = '공지사항',
}

@Entity()
export class Notification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: notificationType,
    nullable: false,
    default: notificationType.comment,
  })
  type: notificationType;

  @Column({ nullable: false })
  targetTitle: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  targetUserId: number;

  @Column({ nullable: false })
  writerId: number;

  @Column({
    type: 'enum',
    enum: customBool,
    nullable: false,
    default: customBool.N,
  })
  isRead: customBool;

  @Column({ nullable: true })
  targetPostId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'targetUserId' })
  user: User;

  @ManyToOne(() => User, (user) => user.notificationsWriter)
  @JoinColumn({ name: 'writerId' })
  writerUser: User;
}
