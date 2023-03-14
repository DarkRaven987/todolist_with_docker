import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from 'src/entities/sessions.entity';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sessions]), JwtModule.register({})],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SessionsModule {}
