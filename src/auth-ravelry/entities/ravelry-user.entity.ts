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

// @Entity()
// export class RaverlyUser extends EntityHelper {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'int', nullable: false })
//   user_id: number;

//   @Column('varchar', { length: 320, nullable: false })
//   raverly_id: string;

//   @Column('varchar', { length: 100, nullable: true })
//   @Exclude()
//   raverly_token: string;

//   @Column('varchar', { length: 100, nullable: true })
//   @Exclude()
//   raverly_refresh_token: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

//   @DeleteDateColumn()
//   deleted_at: Date;
// }

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
