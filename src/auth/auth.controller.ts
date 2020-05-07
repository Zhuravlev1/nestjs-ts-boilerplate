import { Controller, Get, Post, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Headers('authorization') accessToken: string, @Req() req: any) {
    accessToken = accessToken.replace('Bearer ', '');
    await this.authService.validateToken(accessToken);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Headers('authorization') accessToken: string) {
    accessToken = accessToken.replace('Bearer ', '');
    await this.authService.logout(accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh/token')
  async refreshToken(
    @Headers('authorization') refreshToken: string,
    @Req() req: any,
  ) {
    const { email, id } = req.user;
    refreshToken = refreshToken.replace('Bearer ', '');
    return this.authService.refreshToken(refreshToken, id, email);
  }
}
