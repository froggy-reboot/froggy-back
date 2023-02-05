import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Role } from '../../roles/entities/role.entity';
// import { Status } from '../../statuses/entities/status.entity';
// import { FileEntity } from '../../files/entities/file.entity';
// import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
// import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
// import { Exclude, Expose } from 'class-transformer';

export enum enrollType {
  local = 'local',
  google = 'google',
  raverly = 'raverly',
}
export enum role {
  customer = 'customer',
  seller = 'seller',
}

export enum gender {
  male = 'male',
  female = 'female',
  none = 'none',
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  raverly_id: number;

  @Column()
  raverly_token: string;

  @Column()
  enroll_type: enrollType;

  @Column()
  birth: Date;

  @Column()
  gender: Date;

  @Column()
  blog_url: string;

  @Column()
  role: role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

/*
참고하라고 냄겨둠
 @Column({ unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ nullable: true })
  firstName: string | null;

  @Index()
  @Column({ nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Column({ nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;
*/
