import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/article-tab/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'articleLike' })
export class ArticleLike extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  userId: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  articleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.articleLikes)
  user: User;

  @ManyToOne(() => Article, (article) => article.articleLikes)
  article: Article;
}
