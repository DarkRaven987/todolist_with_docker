import { Test, TestingModule } from '@nestjs/testing';
import { TodosStatusEnumController } from './todos-status-enum.controller';

describe('TodosStatusEnumController', () => {
  let controller: TodosStatusEnumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosStatusEnumController],
    }).compile();

    controller = module.get<TodosStatusEnumController>(TodosStatusEnumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
