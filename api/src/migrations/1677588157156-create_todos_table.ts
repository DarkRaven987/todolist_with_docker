import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodosTable1677588157156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE todos (
        id serial PRIMARY KEY,
        title varchar NOT NULL DEFAULT '',
        description varchar NOT NULL DEFAULT '',
        created_at timestamp NOT NULL DEFAULT NOW(),
        finished_at timestamp,
        "statusId" int NULL DEFAULT 1
      );

      ALTER TABLE todos ADD CONSTRAINT "FK_8658c4d078e986717e997ce1ea9" FOREIGN KEY ("statusId") REFERENCES todos_status_enum(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TABLE todos;
    `);
  }
}
