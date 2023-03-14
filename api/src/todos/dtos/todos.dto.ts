export class updateTodoStatusDto {
  todoId: number;
  status: number;
}

export class createTodoDto {
  title: string;
  description: string;
}

export class deleteTodoDto {
  todoId: number;
}

export class updateTodoDto {
  todoId: number;
  title: string;
  description: string;
}
