import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1681566161297 implements MigrationInterface {
    name = 'updateUser1681566161297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL DEFAULT 'https://froggy-image.s3.amazonaws.com/6d67457b-be7e-4e06-a3bd-c222d4415ddd.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL DEFAULT 'https://imhannah.me/common/img/default_profile.png'`);
    }

}
