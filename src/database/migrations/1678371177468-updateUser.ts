import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1678371177468 implements MigrationInterface {
    name = 'updateUser1678371177468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ravelry_user\` CHANGE \`Refresh_token\` \`refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_ravelry_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isRavelryIntegrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isRavelryIntegrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_ravelry_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`ravelry_user\` CHANGE \`refresh_token\` \`Refresh_token\` varchar(100) NULL`);
    }

}
