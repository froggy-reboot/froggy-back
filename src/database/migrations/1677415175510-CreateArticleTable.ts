import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleTable1677415175510 implements MigrationInterface {
    name = 'CreateArticleTable1677415175510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`nickname\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`writer_id\` int NOT NULL, \`liked\` int NOT NULL DEFAULT '0', \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`forgot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` (\`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_refresh_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`enroll_type\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`enroll_type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`blog_url\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`blog_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_integrated\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_certified\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_certified\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`certify_hash\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`certify_hash\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_40808690eb7b915046558c0f81b\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`forgot\` ADD CONSTRAINT \`FK_31f3c80de0525250f31e23a9b83\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forgot\` DROP FOREIGN KEY \`FK_31f3c80de0525250f31e23a9b83\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_40808690eb7b915046558c0f81b\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`certify_hash\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`certify_hash\` varchar(300) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_certified\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_certified\` enum ('Y', 'N') NULL COMMENT '이메일 인증 여부' DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_integrated\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_integrated\` enum ('Y', 'N') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('customer', 'seller') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`blog_url\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`blog_url\` varchar(2084) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` enum ('male', 'female', 'none') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`enroll_type\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`enroll_type\` enum ('local', 'google', 'raverly', 'naver') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_refresh_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`raverly_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`raverly_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(80) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(40) NULL`);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` ON \`forgot\``);
        await queryRunner.query(`DROP TABLE \`forgot\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`nickname\` ON \`user\` (\`nickname\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`user\` (\`email\`)`);
    }

}
