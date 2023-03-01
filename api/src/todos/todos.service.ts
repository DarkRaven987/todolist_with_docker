import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
  ) {}

  getTodos() {
    return this.todosRepository.find({ relations: ['status'] });
  }
}
