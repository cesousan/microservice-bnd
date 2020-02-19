import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = Number.parseInt(process.env.SERVER_PORT, 10) || 3999;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
