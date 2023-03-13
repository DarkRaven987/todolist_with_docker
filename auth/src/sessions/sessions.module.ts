import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from 'src/entities/sessions.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sessions]), JwtModule.register({})],
  controllers: [SessionsController],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SessionsModule {}
