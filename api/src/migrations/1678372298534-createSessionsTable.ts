import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSessionsTable1678372298534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE sessions (
        id serial PRIMARY KEY,
        "refreshToken" varchar NOT NULL DEFAULT '',
        "userId" int NULL DEFAULT 1
      );

      ALTER TABLE sessions ADD CONSTRAINT fk_sesssion_to_users FOREIGN KEY ("userId") REFERENCES users(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TABLE sessions;
    `);
  }
}
