import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../articles/entities/article.entity';

export class Comment extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1' })
  id: number;
  @Column({ nullable: false })
  @ApiProperty({ example: '11' })
  post_id: number;
  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  writer_id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'synodic' })
  nickname: string;

  @Column({ nullable: false })
  @ApiProperty({ example: '내용입니다.' })
  content: string;
  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  created_at: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deleted_at: Date;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'post_id' })
  article: Article;
}
