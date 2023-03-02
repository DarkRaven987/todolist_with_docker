import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosStatusEnum } from 'src/entities/todos_status_enum.entity';
import { TodosStatusEnumController } from './todos-status-enum.controller';
import { TodosStatusEnumService } from './todos-status-enum.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodosStatusEnum]),
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
  controllers: [TodosStatusEnumController],
  providers: [TodosStatusEnumService],
})
export class TodosStatusEnumModule {}
