import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter({ bodyLimit: 10048576 });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const config = app.get(ConfigService);
  const logger = new Logger(NestApplication.name);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swagger = new DocumentBuilder()
    .setTitle(`Test ERC20 smart contract API`)
    .build();

  const document = SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup(config.get('docs'), app, document);

  await app.listen(config.get<number>('port'), '0.0.0.0');

  process.on('uncaughtException', async (error: any) => {
    logger.error('Uncaught Exception:', error?.message);
  });

  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
