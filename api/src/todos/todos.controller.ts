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
import { TodosStatusEnumService } from 'src/todos-status-enum/todos-status-enum.service';
import {
  createTodoDto,
  createTodoSchema,
  deleteTodoDto,
  deleteTodoSchema,
  updateTodoDto,
  updateTodoSchema,
  updateTodoStatusDto,
  updateTodoStatusSchema,
} from './dtos/todos.dto';
import { TodosService } from './todos.service';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly todosStatusEnumService: TodosStatusEnumService,
  ) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post('updateStatus')
  @UsePipes(new JoiValidationPipe(updateTodoStatusSchema))
  async updateTodoStatus(@Body() data: updateTodoStatusDto) {
    const currentStatus = await this.todosStatusEnumService.getById(
      data.status,
    );
    let updateObj = {};
    if (currentStatus.name === 'Done') {
      updateObj = {
        statusId: data.status,
        finished_at: new Date(),
      };
    } else {
      updateObj = {
        statusId: data.status,
      };
    }
    return this.todosService.updateTodoStatus({
      todoId: data.todoId,
      updateObj,
    });
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

  @Get('dailyCreated/:startDate/:endDate')
  getDailyCreatedTodos(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.todosService.getTodosDaily('created', startDate, endDate);
  }

  @Get('dailyDone/:startDate/:endDate')
  getDailyDoneTodos(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.todosService.getTodosDaily('done', startDate, endDate);
  }
}
