import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosStatusEnumModule } from 'src/todos-status-enum/todos-status-enum.module';
import { TodosStatusEnumService } from 'src/todos-status-enum/todos-status-enum.service';
import { TodosStatusEnum } from 'src/entities/todos_status_enum.entity';

@Module({
  imports: [
    TodosStatusEnumModule,
    TypeOrmModule.forFeature([Todos, TodosStatusEnum]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_MICROSERVICE_HOST'),
            port: configService.get('AUTH_MICROSERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosStatusEnumService],
})
export class TodosModule {}
