import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678633299667 implements MigrationInterface {
    name = 'init1678633299667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refreshToken\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refresh_token\` varchar(100) NULL`);
    }

}
