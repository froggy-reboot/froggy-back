import { MigrationInterface, QueryRunner } from "typeorm";

export class createNotification1686240392155 implements MigrationInterface {
    name = 'createNotification1686240392155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('댓글') NOT NULL DEFAULT '댓글', \`targetTitle\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`targetUserId\` int NOT NULL, \`writerId\` int NOT NULL, \`isRead\` enum ('Y', 'N') NOT NULL DEFAULT 'N', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_42071de20bb698f8b759c492ddd\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_796e888fe89e743a9b42eef1d56\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_796e888fe89e743a9b42eef1d56\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_42071de20bb698f8b759c492ddd\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
