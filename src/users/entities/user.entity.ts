import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';
import { Article } from '../../article-tab/articles/entities/article.entity';
import { Comment } from '../../article-tab/comments/entities/comment.entity';
import { RavelryUser } from 'src/ravelry-users/entities/ravelry-user.entity';
import { ArticleLike } from 'src/article-tab/article-likes/entities/article-like.entity';
import { Thread } from 'src/thread-tab/threads/entities/thread.entity';

export enum enrollType {
  local = 'local',
  google = 'google',
  ravelry = 'ravelry',
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
  enrollType!: enrollType;

  @Column({ nullable: true })
  birth: Date;

  @Column({ type: 'enum', enum: gender, nullable: true })
  gender!: gender;

  @Column({
    type: 'varchar',
    nullable: true,
    default:
      'https://froggy-image.s3.amazonaws.com/6d67457b-be7e-4e06-a3bd-c222d4415ddd.png',
  })
  profileImg: string;

  @Column('varchar', { length: 2084, nullable: true })
  blogUrl: string;

  @Column({ type: 'enum', enum: role, nullable: true, default: role.customer })
  role!: role;

  @Column({
    type: 'enum',
    enum: customBool,
    nullable: false,
    default: customBool.N,
  })
  isRavelryIntegrated!: customBool;

  @Column({ type: 'int', nullable: true })
  ravelryUserId: number;

  @Column('varchar', { length: 100, nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: customBool,
    nullable: false,
    default: customBool.N,
  })
  isCertified!: customBool;

  @Column({ type: 'varchar', length: 300 })
  certifyHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ArticleLike, (articleLike) => articleLike.user)
  articleLikes: ArticleLike[];

  @OneToOne(() => RavelryUser, (RavelryUser) => RavelryUser.userId)
  ravelryUser: RavelryUser;
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
