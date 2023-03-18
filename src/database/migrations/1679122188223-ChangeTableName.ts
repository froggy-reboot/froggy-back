import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTableName1679122188223 implements MigrationInterface {
    name = 'ChangeTableName1679122188223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`RavelryUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`raverlyId\` varchar(320) NOT NULL, \`token\` varchar(100) NULL, \`refresh_token\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(40) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ArticleImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`commentId\` int NULL, \`isComment\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ArticleImage\` ADD CONSTRAINT \`FK_0a37d344bc5688ff7be6657645e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ArticleImage\` DROP FOREIGN KEY \`FK_0a37d344bc5688ff7be6657645e\``);
        await queryRunner.query(`DROP TABLE \`ArticleImage\``);
        await queryRunner.query(`DROP TABLE \`RavelryUser\``);
    }

}
