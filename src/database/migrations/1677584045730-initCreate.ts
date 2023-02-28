import { MigrationInterface, QueryRunner } from "typeorm";

export class initCreate1677584045730 implements MigrationInterface {
    name = 'initCreate1677584045730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`writer_id\` int NOT NULL, \`liked\` int NOT NULL DEFAULT '0', \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(320) NOT NULL, \`password\` varchar(80) NULL, \`name\` varchar(40) NULL, \`age\` int NOT NULL, \`nickname\` varchar(40) NOT NULL, \`raverly_token\` varchar(100) NULL, \`raverly_refresh_token\` varchar(100) NULL, \`enroll_type\` enum ('local', 'google', 'raverly', 'naver', 'kakao') NOT NULL, \`birth\` datetime NOT NULL, \`gender\` enum ('male', 'female', 'none') NULL, \`blog_url\` varchar(2084) NULL, \`role\` enum ('customer', 'seller') NULL, \`is_integrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`is_certified\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`certify_hash\` varchar(300) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`forgot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` (\`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_59dff4bd58aec767402ee495ed0\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`forgot\` ADD CONSTRAINT \`FK_31f3c80de0525250f31e23a9b83\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forgot\` DROP FOREIGN KEY \`FK_31f3c80de0525250f31e23a9b83\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_59dff4bd58aec767402ee495ed0\``);
        await queryRunner.query(`DROP INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` ON \`forgot\``);
        await queryRunner.query(`DROP TABLE \`forgot\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
