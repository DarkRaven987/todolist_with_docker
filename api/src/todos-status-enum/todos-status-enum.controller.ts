import { Controller, Get } from '@nestjs/common';
import { TodosStatusEnumService } from './todos-status-enum.service';

@Controller('todos-status-enum')
export class TodosStatusEnumController {
  constructor(
    private readonly todosStatusEnumsService: TodosStatusEnumService,
  ) {}

  @Get()
  getUsers() {
    return this.todosStatusEnumsService.getStatusEnums();
  }
}
