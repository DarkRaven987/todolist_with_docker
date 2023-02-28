import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedUsersTable1677588169808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (username, password) VALUES ('OlehTest', '9b599faac222a0dfcfab49148ce40c26');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
