import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedUsersTable1677588169808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (username, password) VALUES ('Test', '47b1daeefb6efa20308fc731bbb47208');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
