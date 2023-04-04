import { MigrationInterface, QueryRunner } from "typeorm";

export class updateArticleLike1680517008295 implements MigrationInterface {
    name = 'updateArticleLike1680517008295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`deletedAt\` \`deletedAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articleLike\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL`);
    }

}
