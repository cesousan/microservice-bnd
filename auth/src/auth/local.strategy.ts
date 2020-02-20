import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Observable<any> {
    return this.authService.validateUser(username, password).pipe(
      map(user => {
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }),
    );
  }
}
