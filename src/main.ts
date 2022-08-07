import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, host);
  console.log("Running on: " + host + ":" + PORT + "/");
  
}
bootstrap();
