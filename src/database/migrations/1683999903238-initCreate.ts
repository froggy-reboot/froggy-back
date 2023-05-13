import { MigrationInterface, QueryRunner } from "typeorm";

export class initCreate1683999903238 implements MigrationInterface {
    name = 'initCreate1683999903238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ravelryUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`ravelryId\` varchar(320) NOT NULL, \`token\` varchar(100) NULL, \`refresh_token\` varchar(100) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(320) NOT NULL, \`password\` varchar(80) NULL, \`name\` varchar(40) NULL, \`age\` int NULL, \`nickname\` varchar(40) NOT NULL, \`enrollType\` enum ('local', 'google', 'ravelry', 'naver', 'kakao') NOT NULL, \`birth\` datetime NULL, \`gender\` enum ('male', 'female', 'none') NULL, \`profileImg\` varchar(255) NULL DEFAULT 'https://froggy-image.s3.amazonaws.com/6d67457b-be7e-4e06-a3bd-c222d4415ddd.png', \`blogUrl\` varchar(2084) NULL, \`role\` enum ('customer', 'seller') NULL DEFAULT 'customer', \`isRavelryIntegrated\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`ravelryUserId\` int NULL, \`refreshToken\` varchar(100) NULL, \`isCertified\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`certifyHash\` varchar(300) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articleLike\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`articleId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`forgot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` (\`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_aed1ccce26fc52108245ecefcb0\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD CONSTRAINT \`FK_55d651a3e9d85a456973b4bd007\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_e9cee94461fbc9c81138e4abac7\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` ADD CONSTRAINT \`FK_e006bf690d8b39ed0aaf2904df7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` ADD CONSTRAINT \`FK_8e36fda89e1c550b78892513201\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`forgot\` ADD CONSTRAINT \`FK_31f3c80de0525250f31e23a9b83\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forgot\` DROP FOREIGN KEY \`FK_31f3c80de0525250f31e23a9b83\``);
        await queryRunner.query(`ALTER TABLE \`articleLike\` DROP FOREIGN KEY \`FK_8e36fda89e1c550b78892513201\``);
        await queryRunner.query(`ALTER TABLE \`articleLike\` DROP FOREIGN KEY \`FK_e006bf690d8b39ed0aaf2904df7\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_e9cee94461fbc9c81138e4abac7\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP FOREIGN KEY \`FK_55d651a3e9d85a456973b4bd007\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_aed1ccce26fc52108245ecefcb0\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_df507d27b0fb20cd5f7bef9b9a\` ON \`forgot\``);
        await queryRunner.query(`DROP TABLE \`forgot\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`articleLike\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`ravelryUser\``);
    }

}
