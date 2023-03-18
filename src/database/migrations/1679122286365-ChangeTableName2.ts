import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTableName21679122286365 implements MigrationInterface {
    name = 'ChangeTableName21679122286365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ravelryUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`raverlyId\` varchar(320) NOT NULL, \`token\` varchar(100) NULL, \`refresh_token\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articleImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`commentId\` int NULL, \`isComment\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD CONSTRAINT \`FK_55d651a3e9d85a456973b4bd007\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP FOREIGN KEY \`FK_55d651a3e9d85a456973b4bd007\``);
        await queryRunner.query(`DROP TABLE \`articleImage\``);
        await queryRunner.query(`DROP TABLE \`ravelryUser\``);
    }

}
