import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleTable1678543834017 implements MigrationInterface {
    name = 'CreateArticleTable1678543834017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`writer_id\` int NOT NULL, \`liked\` int NOT NULL DEFAULT '0', \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL, \`writer_id\` int NOT NULL, \`nickname\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ravelryUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isRavelryIntegrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_raverly_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`enroll_type\` \`enroll_type\` enum ('local', 'google', 'raverly', 'naver', 'kakao') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_59dff4bd58aec767402ee495ed0\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c91a52757c962864d1c93bb85b5\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c91a52757c962864d1c93bb85b5\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_59dff4bd58aec767402ee495ed0\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`enroll_type\` \`enroll_type\` enum ('local', 'google', 'ravelry', 'naver', 'kakao') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_raverly_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isRavelryIntegrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`ravelryUserId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`article\``);
    }

}
