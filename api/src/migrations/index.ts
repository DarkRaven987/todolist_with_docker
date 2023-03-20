import { createUsersTable1677588102183 } from './1677588102183-create_users_table';
import { createTodosStatusEnumTable1677588154510 } from './1677588154510-create_todos_status_enum_table';
import { createTodosTable1677588157156 } from './1677588157156-create_todos_table';
import { seedUsersTable1677588169808 } from './1677588169808-seed_users_table';
import { seedTodosStatusEnumTable1677588178988 } from './1677588178988-seed_todos_status_enum_table';
import { seedTodosTable1677588184857 } from './1677588184857-seed_todos_table';
import { todosAddIsDeletedColumn1678262607852 } from './1678262607852-todos-add-isDeleted-column';
import { createSessionsTable1678372298534 } from './1678372298534-createSessionsTable';
import { usersDeleteRefreshTokenColumn1678374268042 } from './1678374268042-users-deleteRefreshTokenColumn';

export default [
  createUsersTable1677588102183,
  createTodosStatusEnumTable1677588154510,
  createTodosTable1677588157156,
  seedUsersTable1677588169808,
  seedTodosStatusEnumTable1677588178988,
  seedTodosTable1677588184857,
  todosAddIsDeletedColumn1678262607852,
  createSessionsTable1678372298534,
  usersDeleteRefreshTokenColumn1678374268042,
];
