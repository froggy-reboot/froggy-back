import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleTable1678173652843 implements MigrationInterface {
    name = 'UpdateArticleTable1678173652843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`nickname\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`nickname\` varchar(255) NOT NULL`);
    }

}
