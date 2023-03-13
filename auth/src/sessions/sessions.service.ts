import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from 'src/entities/sessions.entity';
import { REFERSH_TOKEN_KEY } from 'src/utils/const';
import { Not, Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private readonly sessionsRepository: Repository<Sessions>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findSession(userId: number, refreshToken: string) {
    return this.sessionsRepository.findOne({
      where: {
        userId,
        refreshToken,
      },
    });
  }

  async createSession(userId: number, refreshToken: string) {
    return this.sessionsRepository.save({
      userId,
      refreshToken,
    });
  }

  async validateSession(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      secret: this.configService.get(REFERSH_TOKEN_KEY),
    });
  }

  async clearSession(refreshToken: string) {
    return this.sessionsRepository.delete({
      refreshToken,
    });
  }

  async clearAllUserSessions(userId: number) {
    return this.sessionsRepository.delete({ userId });
  }

  async clearUserSessionsExceptCurrent(userId: number, refreshToken: string) {
    return this.sessionsRepository.delete({
      userId,
      refreshToken: Not(refreshToken),
    });
  }
}
