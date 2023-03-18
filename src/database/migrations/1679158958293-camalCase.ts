import { MigrationInterface, QueryRunner } from "typeorm";

export class camalCase1679158958293 implements MigrationInterface {
    name = 'camalCase1679158958293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_03a590c26b0910b0bb49682b1e3\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c91a52757c962864d1c93bb85b5\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP FOREIGN KEY \`FK_55d651a3e9d85a456973b4bd007\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_59dff4bd58aec767402ee495ed0\``);
        await queryRunner.query(`CREATE TABLE \`commentImage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`commentId\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`article_id\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`writer_id\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`blog_url\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP COLUMN \`commentId\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP COLUMN \`isComment\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`article_type\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`writer_id\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`articleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`writerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profile_img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`blogUrl\` varchar(2084) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`writerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`articleType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`commentImage\` ADD CONSTRAINT \`FK_53b3b9a7aae87532a533fd3e0eb\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c20404221e5c125a581a0d90c0e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_aed1ccce26fc52108245ecefcb0\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD CONSTRAINT \`FK_55d651a3e9d85a456973b4bd007\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_e9cee94461fbc9c81138e4abac7\` FOREIGN KEY (\`writerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_e9cee94461fbc9c81138e4abac7\``);
        await queryRunner.query(`ALTER TABLE \`articleImage\` DROP FOREIGN KEY \`FK_55d651a3e9d85a456973b4bd007\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_aed1ccce26fc52108245ecefcb0\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
        await queryRunner.query(`ALTER TABLE \`commentImage\` DROP FOREIGN KEY \`FK_53b3b9a7aae87532a533fd3e0eb\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`articleType\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`writerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`blogUrl\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profile_img\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`writerId\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`articleId\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`writer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`article_type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD \`isComment\` enum ('Y', 'N') NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD \`commentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`blog_url\` varchar(2084) NULL`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`ravelryUser\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`writer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`article_id\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`commentImage\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_59dff4bd58aec767402ee495ed0\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articleImage\` ADD CONSTRAINT \`FK_55d651a3e9d85a456973b4bd007\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c91a52757c962864d1c93bb85b5\` FOREIGN KEY (\`writer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_03a590c26b0910b0bb49682b1e3\` FOREIGN KEY (\`article_id\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
