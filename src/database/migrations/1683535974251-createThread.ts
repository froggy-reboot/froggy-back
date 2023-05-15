import { MigrationInterface, QueryRunner } from "typeorm";

export class createThread1683535974251 implements MigrationInterface {
    name = 'createThread1683535974251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pattern\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ravelryPatternId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_eec305bc037a7a4bf013768b54\` (\`ravelryPatternId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`threadImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleId\` int NOT NULL, \`order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`threadId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`thread\` (\`id\` int NOT NULL AUTO_INCREMENT, \`writerId\` int NOT NULL, \`patternId\` int NOT NULL, \`liked\` int NOT NULL DEFAULT '0', \`content\` varchar(1000) NOT NULL, \`order\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`threadImage\` ADD CONSTRAINT \`FK_a9ffc43514f66787553cc6d309c\` FOREIGN KEY (\`threadId\`) REFERENCES \`thread\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`threadImage\` DROP FOREIGN KEY \`FK_a9ffc43514f66787553cc6d309c\``);
        await queryRunner.query(`DROP TABLE \`thread\``);
        await queryRunner.query(`DROP TABLE \`threadImage\``);
        await queryRunner.query(`DROP INDEX \`IDX_eec305bc037a7a4bf013768b54\` ON \`pattern\``);
        await queryRunner.query(`DROP TABLE \`pattern\``);
    }

}
