import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/validateToken.guard';
import { TodosService } from './todos.service';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }
}
