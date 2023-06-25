import { EntityHelper } from '../../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../../comments/entities/comment.entity';

@Entity({ name: 'commentImage' })
export class CommentImage extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  commentId: number;

  @Column({ nullable: false, length: 400 })
  @ApiProperty({
    example:
      'https://froggy-image.s3.amazonaws.com/acb7a789-7676-42af-a484-f88fe106b885.jpg',
  })
  url: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  createdAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deletedAt: Date;

  @ManyToOne(() => Comment, (comment) => comment.images)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
