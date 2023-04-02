import { MigrationInterface, QueryRunner } from "typeorm";

export class profileImg1679853875389 implements MigrationInterface {
    name = 'profileImg1679853875389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL DEFAULT 'https://imhannah.me/common/img/default_profile.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImg\` \`profileImg\` varchar(255) NULL`);
    }

}
