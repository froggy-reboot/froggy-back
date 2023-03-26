import { MigrationInterface, QueryRunner } from "typeorm";

export class userCamalCase1679815839187 implements MigrationInterface {
    name = 'userCamalCase1679815839187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`enroll_type\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_certified\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`certify_hash\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profile_img\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`enrollType\` enum ('local', 'google', 'ravelry', 'naver', 'kakao') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileImg\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isCertified\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`certifyHash\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`certifyHash\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isCertified\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileImg\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`enrollType\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profile_img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`certify_hash\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_certified\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`enroll_type\` enum ('local', 'google', 'ravelry', 'naver', 'kakao') NOT NULL`);
    }

}
