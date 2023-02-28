import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTodosTable1677588184857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
        INSERT INTO todos (title, description) 
        VALUES 
          ('Wake up', 'Good morning! It is a nice day today. Let us do something great!'),
          ('Drink Cofee', 'You still drink this? Nah, guess I should stop drinking it soon...'),
          ('Have breakfast', 'Um... Do we have anything to eat at all? It is better to check the fridge.'),
          ('Buy food', 'No food found in fridge. It is better to go buy something to cook.');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
