import { MigrationInterface, QueryRunner } from "typeorm";

export class initCreate1685178552853 implements MigrationInterface {
    name = 'initCreate1685178552853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reporterId\` int NOT NULL, \`reportedId\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`targetId\` int NOT NULL, \`title\` varchar(255) NULL, \`content\` varchar(1000) NOT NULL, \`reason\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thread\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL DEFAULT 'https://froggy-image.s3.ap-northeast-2.amazonaws.com/45d35cd9-1a32-41d3-b8ef-e475d2b61a90.png'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`userId_articleId_index\` ON \`articleLike\` (\`userId\`, \`articleId\`)`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_579332340c5be8df7b71c2ba936\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_579332340c5be8df7b71c2ba936\``);
        await queryRunner.query(`DROP INDEX \`userId_articleId_index\` ON \`articleLike\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL DEFAULT 'https://froggy-image.s3.ap-northeast-2.amazonaws.com/ad97e1f8-2565-4b2b-9555-046c5252ec77.png'`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD \`order\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`report\``);
    }

}
