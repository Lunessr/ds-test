import {MigrationInterface, QueryRunner} from "typeorm";

export class startingMigration1659895195666 implements MigrationInterface {
    name = 'startingMigration1659895195666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`links\` (\`long_link\` text NOT NULL, \`token\` varchar(255) NOT NULL, \`redirect_count\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`links\``);
    }

}
