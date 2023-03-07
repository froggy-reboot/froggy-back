import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum customBool {
  Y = 'Y',
  N = 'N',
}

@Entity()
export class RaverlyUser extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column('varchar', { length: 320, nullable: false })
  raverlyId: string;

  @Column('varchar', { length: 100, nullable: true })
  @Exclude()
  Token: string;

  @Column('varchar', { length: 100, nullable: true })
  @Exclude()
  Refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => User, (User) => User.raverlyUserId)
  User: User;
}
