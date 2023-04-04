import { MigrationInterface, QueryRunner } from "typeorm";

export class createArticleLike1680515289604 implements MigrationInterface {
    name = 'createArticleLike1680515289604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`articleLike\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`articleId\` int NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`deletedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` ADD CONSTRAINT \`FK_e006bf690d8b39ed0aaf2904df7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` ADD CONSTRAINT \`FK_8e36fda89e1c550b78892513201\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articleLike\` DROP FOREIGN KEY \`FK_8e36fda89e1c550b78892513201\``);
        await queryRunner.query(`ALTER TABLE \`articleLike\` DROP FOREIGN KEY \`FK_e006bf690d8b39ed0aaf2904df7\``);
        await queryRunner.query(`DROP TABLE \`articleLike\``);
    }

}
