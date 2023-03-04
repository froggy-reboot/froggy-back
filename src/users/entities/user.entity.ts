import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Role } from '../../roles/entities/role.entity';
// import { Status } from '../../statuses/entities/status.entity';
// import { FileEntity } from '../../files/entities/file.entity';
// import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';
import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
// import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
// import { Exclude, Expose } from 'class-transformer';

export enum enrollType {
  local = 'local',
  google = 'google',
  raverly = 'raverly',
  naver = 'naver',
  kakao = 'kakao',
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

export enum customBool {
  Y = 'Y',
  N = 'N',
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 320, nullable: false })
  email: string;

  @Column('varchar', { length: 80, nullable: true })
  @Exclude()
  password: string;

  @Column('varchar', { length: 40, nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column('varchar', { length: 40, nullable: false })
  nickname: string;

  @Column({ type: 'enum', enum: enrollType, nullable: false })
  enroll_type!: enrollType;

  @Column({ nullable: true })
  birth: Date;

  @Column({ type: 'enum', enum: gender, nullable: true })
  gender!: gender;

  @Column('varchar', { length: 2084, nullable: true })
  blog_url: string;

  @Column({ type: 'enum', enum: role, nullable: true, default: role.customer })
  role!: role;

  @Column({
    type: 'enum',
    enum: customBool,
    nullable: false,
    default: customBool.N,
  })
  is_raverly_integrated!: customBool;

  @Column('varchar', { length: 100, nullable: true })
  @Exclude()
  raverly_token: string;

  @Column('varchar', { length: 100, nullable: true })
  @Exclude()
  raverly_refresh_token: string;

  @Column({
    type: 'enum',
    enum: customBool,
    nullable: false,
    default: customBool.N,
  })
  is_certified!: customBool;

  @Column({ type: 'varchar', length: 300 })
  certify_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Article, (article) => article.writer_id)
  articleId: Article[];

  @OneToMany(() => Comment, (comment) => comment.writer_id)
  comments: Comment[];
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
