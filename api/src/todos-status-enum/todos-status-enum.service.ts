import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosStatusEnum } from 'src/entities/todos_status_enum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosStatusEnumService {
  constructor(
    @InjectRepository(TodosStatusEnum)
    private readonly todosStatusEnumRepository: Repository<TodosStatusEnum>,
  ) {}

  getStatusEnums() {
    return this.todosStatusEnumRepository.find();
  }
}
