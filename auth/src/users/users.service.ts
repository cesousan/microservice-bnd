import { Observable, of } from 'rxjs';
import { pluck, map, tap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

import { Injectable, HttpService, Logger } from '@nestjs/common';

import { User } from './users.model';
import { ConfigService } from '@nestjs/config';
import { UsersAPIConfig } from 'src/config/users-api.config';

@Injectable()
export class UsersService {
  private usersAPIUrl: string;
  private logger: Logger;
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.logger = new Logger('UsersService');
    this.usersAPIUrl = this.getUsersAPIBaseUrl(this.config.get('usersAPI'));
    this.logger.log(this.usersAPIUrl);
  }

  findAll(): Observable<User[]> {
    if (this.usersAPIUrl) {
      return this.http.get<User[]>(this.usersAPIUrl).pipe(pluck('data'));
    }
    this.logger.error('users API url is not defined');
    return of(null);
  }

  findByUsername(username: string): Observable<User> {
    if (this.usersAPIUrl) {
      const url = `${this.usersAPIUrl}/name/${username}`;
      return this.http.get<any>(url).pipe(
        pluck('data', 'data'),
        tap(data => typeof data === 'string'),
        map(user => JSON.parse(user)),
      );
    }
    this.logger.error('users API url is not defined');
    return of(null);
  }

  private getUsersAPIBaseUrl(config: UsersAPIConfig): string | null {
    // TODO: add checks
    const { useSsl, host, port } = config.connection;
    const { base: baseEndpoint } = config.endpoints;
    return !!host && !!port && !!baseEndpoint
      ? `${useSsl ? 'https' : 'http'}://${host}:${port}/${baseEndpoint}`
      : null;
  }
}
