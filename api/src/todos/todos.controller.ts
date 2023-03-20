import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/validateToken.guard';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import {
  createTodoDto,
  deleteTodoDto,
  updateTodoDto,
  updateTodoStatusDto,
} from './dtos/todos.dto';
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
  updateTodoStatusSchema,
} from './dtos/todos.joi';
import { TodosService } from './todos.service';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post('update-status')
  @UsePipes(new JoiValidationPipe(updateTodoStatusSchema))
  async updateTodoStatus(@Body() data: updateTodoStatusDto) {
    return this.todosService.updateTodoStatus(data);
  }

  @Post('create')
  @UsePipes(new JoiValidationPipe(createTodoSchema))
  async createTodo(@Body() data: createTodoDto) {
    return this.todosService.createTodo(data);
  }

  @Post('delete')
  @UsePipes(new JoiValidationPipe(deleteTodoSchema))
  async deleteTodo(@Body() data: deleteTodoDto) {
    return this.todosService.deleteTodo(data);
  }

  @Post('update')
  @UsePipes(new JoiValidationPipe(updateTodoSchema))
  async updateTodo(@Body() data: updateTodoDto) {
    return this.todosService.updateTodo(data);
  }

  @Get('daily-created/:startDate/:endDate')
  getDailyCreatedTodos(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.todosService.getTodosDaily('created', startDate, endDate);
  }

  @Get('daily-done/:startDate/:endDate')
  getDailyDoneTodos(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.todosService.getTodosDaily('done', startDate, endDate);
  }
}
