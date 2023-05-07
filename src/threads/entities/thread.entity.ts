import { ApiProperty } from '@nestjs/swagger';
import { ThreadImage } from 'src/thread-images/entities/thread-image.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Thread extends EntityHelper {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '11' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  writerId: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '2' })
  patternId: number;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ example: '0' })
  liked: number;

  @Column({ nullable: false })
  @ApiProperty({ example: '내용입니다.' })
  content: string;

  @Column({ nullable: false })
  order: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-02-27T15:15:49.695Z' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ example: 'null' })
  deletedAt: Date;

  @OneToMany(() => ThreadImage, (threadImage) => threadImage.thread, {
    cascade: true,
  })
  images: ThreadImage[];
}
