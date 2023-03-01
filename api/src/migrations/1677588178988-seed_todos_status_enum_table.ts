import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTodosStatusEnumTable1677588178988
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO todos_status_enum (name) VALUES ('To Do'), ('In Progress'), ('Done');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
