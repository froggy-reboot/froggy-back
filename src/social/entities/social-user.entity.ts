// import { Exclude } from 'class-transformer';
// import { EntityHelper } from 'src/utils/entity-helper';
// import {
//   Column,
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// export enum customBool {
//   Y = 'Y',
//   N = 'N',
// }

// export enum enrollType {
//   local = 'local',
//   google = 'google',
//   raverly = 'raverly',
//   naver = 'naver',
//   kakao = 'kakao',
// }

// @Entity()
// export class SocialUser extends EntityHelper {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'int', nullable: false })
//   user_id: number;

//   @Column('varchar', { length: 320, nullable: false })
//   provider_id: string;

//   @Column('varchar', { length: 100, nullable: true })
//   @Exclude()
//   token: string;

//   @Column('varchar', { length: 100, nullable: true })
//   @Exclude()
//   refresh_token: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
// }
