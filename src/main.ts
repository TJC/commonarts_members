import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const publicAssetsDir = process.env["PUBLIC_ASSETS"] || join(__dirname, "..", "public");
  app.useStaticAssets(publicAssetsDir);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
