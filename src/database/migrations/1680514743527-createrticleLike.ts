import { MigrationInterface, QueryRunner } from "typeorm";

export class createrticleLike1680514743527 implements MigrationInterface {
    name = 'createrticleLike1680514743527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`articleId\` int NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`deletedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article_like\` ADD CONSTRAINT \`FK_36fe87c54892234d74f641b60a4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article_like\` ADD CONSTRAINT \`FK_a436ab6e04141e82716fa5de359\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article_like\` DROP FOREIGN KEY \`FK_a436ab6e04141e82716fa5de359\``);
        await queryRunner.query(`ALTER TABLE \`article_like\` DROP FOREIGN KEY \`FK_36fe87c54892234d74f641b60a4\``);
        await queryRunner.query(`DROP TABLE \`article_like\``);
    }

}
