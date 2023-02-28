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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Article extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;
  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  writer_id: number;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ example: '0' })
  liked: number;
  @Column({ nullable: false })
  @ApiProperty({ example: 'synodic' })
  nickname: string;
  @Column({ nullable: false })
  @ApiProperty({ example: '제목입니다.' })
  title: string;
  @Column({ nullable: false })
  @ApiProperty({ example: '내용입니다.' })
  content: string;
  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  created_at: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'writer_id' })
  user: User;
}
