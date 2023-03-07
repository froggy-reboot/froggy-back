import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRaverlyUser1678202519056 implements MigrationInterface {
    name = 'CreateRaverlyUser1678202519056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`raverly_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`raverlyId\` varchar(320) NOT NULL, \`Token\` varchar(100) NULL, \`Refresh_token\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverlyUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`nickname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverlyUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_token\` varchar(100) NULL`);
        await queryRunner.query(`DROP TABLE \`raverly_user\``);
    }

}
