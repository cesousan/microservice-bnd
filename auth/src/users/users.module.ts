import { Module, HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  providers: [UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
