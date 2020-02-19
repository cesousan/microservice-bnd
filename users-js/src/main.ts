import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = Number.parseInt(process.env.USERS_SERVER_PORT) || 6000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
