import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  index() {
    return 'hello from auth';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user.pipe(
      map(user => this.authService.login(user))
    );
  }



}
