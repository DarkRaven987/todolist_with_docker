import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosStatusEnum } from 'src/entities/todos_status_enum.entity';
import { TodosStatusEnumController } from './todos-status-enum.controller';
import { TodosStatusEnumService } from './todos-status-enum.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodosStatusEnum])],
  controllers: [TodosStatusEnumController],
  providers: [TodosStatusEnumService],
})
export class TodosStatusEnumModule {}
