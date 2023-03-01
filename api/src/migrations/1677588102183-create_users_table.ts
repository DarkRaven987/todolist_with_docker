import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1677588102183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id serial PRIMARY KEY,
        username varchar NOT NULL DEFAULT '',
        password varchar NOT NULL DEFAULT '',
        CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TABLE users;
    `);
  }
}
