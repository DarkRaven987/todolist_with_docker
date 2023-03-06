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
import {
  AuthDto,
  authUserSchema,
  checkUsernameDto,
  ValidateDto,
} from './dtos/auth.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { MessagePattern } from '@nestjs/microservices';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
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

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    const currUserToken = req.headers.authorization;
    const currUserData = this.jwtService.decode(currUserToken.split(' ')[1]);
    if (!currUserData) throw new ForbiddenException();
    this.authService.logout(currUserData['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return this.authService.refreshAccessToken(userId, refreshToken);
  }

  @Post('checkUsername')
  async checkUniqueUsername(@Body() data: checkUsernameDto) {
    const res = await this.userService.findByUsername(data.username);
    return { isUnique: !res };
  }

  @MessagePattern({ role: 'auth', cmd: 'verify' })
  async verifyToken(data: ValidateDto) {
    try {
      const res = await this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
