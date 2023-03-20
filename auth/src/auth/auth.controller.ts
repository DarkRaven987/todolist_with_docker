import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto, checkUsernameDto, ValidateDto } from './dtos/auth.dto';
import { authUserSchema } from './dtos/auth.joi';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { MessagePattern } from '@nestjs/microservices';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { ACCESS_TOKEN_KEY, REFERSH_TOKEN_KEY } from 'src/utils/const';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(authUserSchema))
  signup(@Body() createUserDto: AuthDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(new JoiValidationPipe(authUserSchema))
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Post('logout')
  logout(@Body() body) {
    const authHeader = `${body.refreshToken}`.split(' ');
    if (authHeader[0] !== 'Bearer' || !authHeader[1]) {
      throw new ForbiddenException();
    }

    this.authService.logout(authHeader[1]);
  }

  @UseGuards(AccessTokenGuard)
  @Get('total-logout')
  totalLogout(@Req() req: Request) {
    if (!req.user) throw new ForbiddenException();
    this.authService.totalLogout(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout-except-current')
  logoutExceptCurrent(@Req() req: Request, @Body() body) {
    const authHeader = `${body.refreshToken}`.split(' ');
    if (!req.user || authHeader[0] !== 'Bearer' || !authHeader[1])
      throw new ForbiddenException();
    this.authService.logoutExceptCurrent(req.user['sub'], authHeader[1]);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return this.authService.refreshAccessToken(userId, refreshToken);
  }

  @Post('check-username')
  async checkUniqueUsername(@Body() data: checkUsernameDto) {
    const res = await this.userService.findByUsername(data.username);
    return { isUnique: !res };
  }

  @UseGuards(AccessTokenGuard)
  @Post('validate-session')
  async validateSession(@Req() req: Request, @Body() data: ValidateDto) {
    const res = await this.authService.validateToken({
      userId: req.user['sub'],
      jwt: data.jwt.split(' ')[1],
      keyName: REFERSH_TOKEN_KEY,
    });
    return res;
  }

  @MessagePattern({ role: 'auth', cmd: 'verify' })
  async verifyToken(data: ValidateDto) {
    try {
      const res = await this.authService.validateToken({
        jwt: data.jwt,
        keyName: ACCESS_TOKEN_KEY,
      });

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
