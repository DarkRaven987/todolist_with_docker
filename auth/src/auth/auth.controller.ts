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
import { AuthDto, authUserSchema, ValidateDto } from './dtos/auth.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { MessagePattern } from '@nestjs/microservices';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  @Get('logout')
  logout(@Req() req: Request) {
    if (!req?.user) throw new ForbiddenException();
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return this.authService.refreshAccessToken(userId, refreshToken);
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
