import { MigrationInterface, QueryRunner } from "typeorm";

export class ravelry1680075211271 implements MigrationInterface {
    name = 'ravelry1680075211271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` CHANGE \`raverlyId\` \`ravelryId\` varchar(320) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` CHANGE \`ravelryId\` \`raverlyId\` varchar(320) NOT NULL`);
    }

}
