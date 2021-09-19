import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDetails } from './app.entity';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService
    ) {}

  // End point to authenticate a user
  @Post('login')
  login(@Body() logins: LoginDetails): any {
    return this.authService.validateUser(logins);
  }

  @UseGuards(JwtAuthGuard)
  @Get('confirm')
  confirmAuth(): any {
    return {
      message: 'OK'
    }
  }

  @Get('google-auth')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google-auth/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.confirmGoogleOAuth(req)
  }

  @Get('facebook-auth')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  @Get('facebook-auth/redirect')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.appService.confirmFacebookOAuth(req)
  }
}
