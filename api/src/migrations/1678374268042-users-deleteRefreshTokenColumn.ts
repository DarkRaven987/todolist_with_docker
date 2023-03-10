import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersDeleteRefreshTokenColumn1678374268042
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER TABLE users DROP COLUMN "refreshToken";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
