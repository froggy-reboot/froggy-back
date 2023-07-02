// import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import { IsNumber } from 'class-validator';
//
// @Entity()
// @Index('idx_thread_recommend', ['threadId', 'userId'], { unique: true })
// export class ThreadRecommend {
//   @Type(() => Number)
//   @IsNumber()
//   page: number;
//
//   @Type(() => Number)
//   @IsNumber()
//   limit: number = 20;
//
//   @Column()
//   userId: number;
// }
