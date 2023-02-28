import { Test, TestingModule } from '@nestjs/testing';
import { TodosStatusEnumService } from './todos-status-enum.service';

describe('TodosStatusEnumService', () => {
  let service: TodosStatusEnumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosStatusEnumService],
    }).compile();

    service = module.get<TodosStatusEnumService>(TodosStatusEnumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
