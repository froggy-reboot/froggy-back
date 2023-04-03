import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.articleLikes)
  user: User;

  @ManyToOne(() => Article, (article) => article.articleLikes)
  article: Article;
}
