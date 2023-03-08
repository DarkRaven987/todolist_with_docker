import { MigrationInterface, QueryRunner } from 'typeorm';

export class todosAddIsDeletedColumn1678262607852
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE todos
      ADD "isDeleted" boolean NOT NULL DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE todos
      DROW COLUMN "isDeleted";
    `);
  }
}
