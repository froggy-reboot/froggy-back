import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1677584437710 implements MigrationInterface {
    name = 'updateUser1677584437710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NOT NULL`);
    }

}
