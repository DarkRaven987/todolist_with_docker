import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodosStatusEnumTable1677588154510
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE todos_status_enum (
        id serial PRIMARY KEY,
        name varchar NOT NULL DEFAULT ''
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TABLE todos_status_enum;
    `);
  }
}
