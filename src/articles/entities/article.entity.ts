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
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';

export enum articleType {
  everything = '자유',
  question = '질문',
}

@Entity()
export class Article extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  writerId: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '자유' })
  articleType: articleType;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ example: '0' })
  liked: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '제목입니다.' })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ example: '내용입니다.' })
  content: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  createdAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deletedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => ArticleImage, (articleImage) => articleImage.article, {
    cascade: true,
  })
  images: ArticleImage[];

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'writerId' })
  user: User;
}
