import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1604164774154 implements MigrationInterface {
  name = 'CreateUser1604164774154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter database api
      default character set utf8mb4
      collate utf8mb4_general_ci;`,
    );
    await queryRunner.query(
      `CREATE TABLE api.user (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email varchar(320) NOT NULL UNIQUE,
        password varchar(80) NOT NULL,
        nickname varchar(40) NOT NULL UNIQUE,
        name varchar(40) ,
        age int,
        raverly_id varchar(50),
        raverly_token varchar(100),
        enroll_type ENUM ('local', 'google', 'raverly') NOT NULL,
        birth datetime,
        gender ENUM ('male', 'female', 'none'),
        blog_url varchar(2084),
        role ENUM ('customer', 'seller'),
        created_at datetime,
        updated_at datetime,
        deleted_at datetime
      );
      `,
    );
    // await queryRunner.query(
    //   `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
    // await queryRunner.query(
    //   `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    // );
    // await queryRunner.query(`DROP INDEX "IDX_df507d27b0fb20cd5f7bef9b9a"`);
    // await queryRunner.query(`DROP TABLE "forgot"`);
    // await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    // await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    // await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    // await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    // await queryRunner.query(`DROP TABLE "user"`);
    // await queryRunner.query(`DROP TABLE "status"`);
    // await queryRunner.query(`DROP TABLE "role"`);
    // await queryRunner.query(`DROP TABLE "file"`);
  }
}
