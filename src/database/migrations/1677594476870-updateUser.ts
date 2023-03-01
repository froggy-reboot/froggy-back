import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1677594476870 implements MigrationInterface {
    name = 'updateUser1677594476870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_integrated\` \`is_raverly_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`nickname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('customer', 'seller') NULL DEFAULT 'customer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('customer', 'seller') NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_raverly_integrated\` \`is_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
    }

}
