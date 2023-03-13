import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dtos/users.dto';
import { AuthDto, ValidateServiceDto } from './dtos/auth.dto';
import { hashData } from 'src/utils';
import { SessionsService } from 'src/sessions/sessions.service';
import {
  ACCESS_TOKEN_EXPIRE_KEY,
  ACCESS_TOKEN_KEY,
  REFERSH_TOKEN_EXPIRE_KEY,
  REFERSH_TOKEN_KEY,
} from 'src/utils/const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private sessionsService: SessionsService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const hash = hashData(createUserDto.password);
    await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    return { message: 'OK' };
  }

  async signIn(data: AuthDto) {
    const user = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = user.password === hashData(data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.username);
    await this.sessionsService.createSession(
      user.id,
      hashData(tokens.refreshToken),
    );
    delete user.password;
    return { user, ...tokens };
  }

  async logout(refreshToken: string) {
    return this.sessionsService.clearSession(hashData(refreshToken));
  }

  async totalLogout(userId: number) {
    return this.sessionsService.clearAllUserSessions(userId);
  }

  async logoutExceptCurrent(userId: number, refreshToken: string) {
    return this.sessionsService.clearUserSessionsExceptCurrent(
      userId,
      hashData(refreshToken),
    );
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get(ACCESS_TOKEN_KEY),
          expiresIn: this.configService.get(ACCESS_TOKEN_EXPIRE_KEY),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get(REFERSH_TOKEN_KEY),
          expiresIn: this.configService.get(REFERSH_TOKEN_EXPIRE_KEY),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    const currSession = await this.sessionsService.findSession(
      userId,
      hashData(refreshToken),
    );
    if (!user || !currSession) throw new ForbiddenException('Access Denied');

    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        username: user.username,
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
      },
    );
    return {
      accessToken: token,
    };
  }

  async validateToken(validateServiceDto: ValidateServiceDto) {
    try {
      const { userId, jwt, keyName } = validateServiceDto;
      if (userId) {
        const isSessionInDb = await this.sessionsService.findSession(
          userId,
          hashData(jwt),
        );
        if (!isSessionInDb) {
          throw new UnauthorizedException();
        }
      }
      return this.jwtService.verify(jwt, {
        secret: this.configService.get(keyName),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
