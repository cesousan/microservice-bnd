import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import usersAPIConfig from './users-api.config';
import validationSchema from './validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [usersAPIConfig],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
