import { MigrationInterface, QueryRunner } from "typeorm";

export class RavelryUserFix1678204557546 implements MigrationInterface {
    name = 'RavelryUserFix1678204557546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ravelry_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`raverlyId\` varchar(320) NOT NULL, \`Token\` varchar(100) NULL, \`Refresh_token\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_raverly_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverlyUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_ravelry_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`ravelryUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`enroll_type\` \`enroll_type\` enum ('local', 'google', 'ravelry', 'naver', 'kakao') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`enroll_type\` \`enroll_type\` enum ('local', 'google', 'raverly', 'naver', 'kakao') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ravelryUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_ravelry_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverlyUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_raverly_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`DROP TABLE \`ravelry_user\``);
    }

}
