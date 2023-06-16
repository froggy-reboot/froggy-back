import { MigrationInterface, QueryRunner } from "typeorm";

export class initCreate1686898007256 implements MigrationInterface {
    name = 'initCreate1686898007256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`threadImage\` ADD CONSTRAINT \`FK_a9ffc43514f66787553cc6d309c\` FOREIGN KEY (\`threadId\`) REFERENCES \`thread\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`thread\` ADD CONSTRAINT \`FK_579332340c5be8df7b71c2ba936\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_42071de20bb698f8b759c492ddd\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_796e888fe89e743a9b42eef1d56\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_796e888fe89e743a9b42eef1d56\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_42071de20bb698f8b759c492ddd\``);
        await queryRunner.query(`ALTER TABLE \`thread\` DROP FOREIGN KEY \`FK_579332340c5be8df7b71c2ba936\``);
        await queryRunner.query(`ALTER TABLE \`threadImage\` DROP FOREIGN KEY \`FK_a9ffc43514f66787553cc6d309c\``);
    }

}
