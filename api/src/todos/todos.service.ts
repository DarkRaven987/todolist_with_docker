import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';
import { Repository } from 'typeorm';
import { createTodoDto, deleteTodoDto } from './dtos/todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  getTodos() {
    return this.todosRepository.find({
      relations: ['status'],
      where: { isDeleted: false },
    });
  }

  async updateTodoStatus({ todoId, updateObj }) {
    return this.todosRepository.update(todoId, updateObj);
  }

  async createTodo(data: createTodoDto) {
    const result = await this.todosRepository.save({ ...data });
    return result;
  }

  async deleteTodo(data: deleteTodoDto) {
    const result = await this.todosRepository.update(data.todoId, {
      isDeleted: false,
    });
    return result;
  }
}
