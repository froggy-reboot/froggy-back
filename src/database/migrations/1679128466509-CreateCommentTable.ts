import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1679128466509 implements MigrationInterface {
  name = 'CreateCommentTable1679128466509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`article_id\` int NOT NULL, \`writerId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ravelry_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`raverlyId\` varchar(320) NOT NULL, \`token\` varchar(100) NULL, \`refresh_token\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_03a590c26b0910b0bb49682b1e3\` FOREIGN KEY (\`article_id\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c91a52757c962864d1c93bb85b5\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c91a52757c962864d1c93bb85b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_03a590c26b0910b0bb49682b1e3\``,
    );
    await queryRunner.query(`DROP TABLE \`ravelry_user\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
  }
}
