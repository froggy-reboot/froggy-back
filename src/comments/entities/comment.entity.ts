import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../articles/entities/article.entity';
import { User } from '../../users/entities/user.entity';
import { CommentImage } from '../../comment-images/entities/comment-image.entity';

@Entity({ name: 'comment' })
export class Comment extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '11' })
  articleId: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  writerId: number;

  @Column({ nullable: false, length: 1000 })
  @ApiProperty({ example: '내용입니다.' })
  content: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  createdAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deletedAt: Date;

  @ManyToOne(() => Article, (article) => article.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @OneToMany(() => CommentImage, (commentImage) => commentImage.comment)
  images: CommentImage[];
}
