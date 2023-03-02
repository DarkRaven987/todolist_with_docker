import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todos]),
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
  providers: [TodosService],
})
export class TodosModule {}
