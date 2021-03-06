import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): Observable<any> {
    return this.usersService.findByUsername(username).pipe(
      map(user => {
        if (!user) {
          throw new Error('Blarf');
        }
        if (user && user.password === pass) {
          console.log(user);
          const { password, ...result } = user;
          return result;
        }
        return null;
      }),
    );
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
