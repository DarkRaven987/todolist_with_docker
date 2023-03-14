import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';
import { Between, Repository } from 'typeorm';
import { createTodoDto, deleteTodoDto, updateTodoDto } from './dtos/todos.dto';
import { formatDateArray } from '../utils/index.js';
import dayjs = require('dayjs');

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

  async getTodosDaily(status: string, startDate: string, endDate: string) {
    const dateArr = formatDateArray(startDate, endDate);
    const checkingField = status === 'created' ? 'created_at' : 'finished_at';

    const whereObj = {
      [checkingField]: Between(
        dayjs(startDate).startOf('day').toDate(),
        dayjs(endDate).add(1, 'day').endOf('day').toDate(),
      ),
    };
    const todos = await this.todosRepository.find({
      relations: ['status'],
      where: {
        ...whereObj,
        isDeleted: false,
      },
    });

    return {
      dates: dateArr,
      data: [
        {
          name: status === 'created' ? 'Сreated Tasks' : 'Finished Tasks',
          data: dateArr.reduce((acc, date) => {
            acc.push(
              todos.filter(
                (item) =>
                  dayjs(item[checkingField]).format('YYYY-MM-DD') === date,
              ).length,
            );
            return acc;
          }, []),
        },
      ],
    };
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

  async updateTodo(data: updateTodoDto) {
    const result = await this.todosRepository.update(data.todoId, {
      title: data.title,
      description: data.description,
    });
    return result;
  }
}
