import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

console.log(process.env.SERVER_PORT);

const PORT = Number.parseInt(process.env.SERVER_PORT, 10) || 3999;
console.log(PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
