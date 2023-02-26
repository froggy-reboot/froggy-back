import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Article extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  writer_id: number;

  @Column({ nullable: false, default: 0 })
  liked: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  content: string;
  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id' })
  user: User;
}
