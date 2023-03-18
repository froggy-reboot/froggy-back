import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleImage1679122035218 implements MigrationInterface {
    name = 'CreateArticleImage1679122035218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_03a590c26b0910b0bb49682b1e3\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`article_id\` \`articleId\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`article_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`commentId\` int NULL, \`isComment\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c20404221e5c125a581a0d90c0e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article_image\` ADD CONSTRAINT \`FK_904b50d2132065cbfa64da4fb18\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article_image\` DROP FOREIGN KEY \`FK_904b50d2132065cbfa64da4fb18\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
        await queryRunner.query(`DROP TABLE \`article_image\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`articleId\` \`article_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_03a590c26b0910b0bb49682b1e3\` FOREIGN KEY (\`article_id\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
