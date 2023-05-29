import { Allow } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { reportType } from 'src/utils/common/custom.enum';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reporterId: number;

  @Column({ nullable: false })
  reportedId: number;

  @Column({ nullable: false })
  type: reportType;

  @Column({ nullable: false })
  targetId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false, length: 1000 })
  content: string;

  @Column({ nullable: false })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
