import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoard1679489071548 implements MigrationInterface {
    name = 'CreateBoard1679489071548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`commentImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`commentId\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`writerId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articleImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`writerId\` int NOT NULL, \`articleType\` varchar(255) NOT NULL, \`liked\` int NOT NULL DEFAULT '0', \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`commentImage\` ADD CONSTRAINT \`FK_53b3b9a7aae87532a533fd3e0eb\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c20404221e5c125a581a0d90c0e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_aed1ccce26fc52108245ecefcb0\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD CONSTRAINT \`FK_55d651a3e9d85a456973b4bd007\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_e9cee94461fbc9c81138e4abac7\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_e9cee94461fbc9c81138e4abac7\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP FOREIGN KEY \`FK_55d651a3e9d85a456973b4bd007\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_aed1ccce26fc52108245ecefcb0\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
        await queryRunner.query(`ALTER TABLE \`commentImage\` DROP FOREIGN KEY \`FK_53b3b9a7aae87532a533fd3e0eb\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP TABLE \`articleImage\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`commentImage\``);
    }

}
