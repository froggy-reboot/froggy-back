import { ApiProperty } from '@nestjs/swagger';
import { Thread } from 'src/thread-tab/threads/entities/thread.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'threadImage' })
export class ThreadImage extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  articleId: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  order: number;

  @Column({ nullable: false })
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

  @ManyToOne(() => Thread, (thread) => thread.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'threadId' })
  thread: Thread;
}
