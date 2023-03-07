import { MigrationInterface, QueryRunner } from "typeorm";

export class ravelryUserFix1678204752322 implements MigrationInterface {
    name = 'ravelryUserFix1678204752322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ravelry_user\` CHANGE \`Token\` \`token\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ravelry_user\` CHANGE \`token\` \`Token\` varchar(100) NULL`);
    }

}
