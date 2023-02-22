import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

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
}
