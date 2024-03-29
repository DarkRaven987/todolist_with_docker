import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TodosStatusEnumModule } from './todos-status-enum/todos-status-enum.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TodosModule,
    TodosStatusEnumModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: entities,
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
