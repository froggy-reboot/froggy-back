import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentTable1677916825776 implements MigrationInterface {
    name = 'CreateCommentTable1677916825776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c91a52757c962864d1c93bb85b5\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c91a52757c962864d1c93bb85b5\``);
    }

}
