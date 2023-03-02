import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/validateToken.guard';
import { TodosStatusEnumService } from './todos-status-enum.service';

@UseGuards(AuthGuard)
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
