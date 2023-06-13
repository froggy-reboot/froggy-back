import { MigrationInterface, QueryRunner } from "typeorm";

export class updateNotificaion1686293878983 implements MigrationInterface {
    name = 'updateNotificaion1686293878983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`targetPostId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`targetPostId\``);
    }

}
