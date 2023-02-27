import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleTable1677511333206 implements MigrationInterface {
  name = 'CreateArticleTable1677511333206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`nickname\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`nickname\``);
  }
}
