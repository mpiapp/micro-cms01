import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';

dotenv.config();

Bugsnag.start({
  apiKey: '16964c7d87b9d1d49b878ffabfb20d60',
  plugins: [BugsnagPluginExpress]
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  // set pipes
  app.useGlobalPipes(new ValidationPipe())

  // set container for validate
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // set swagger
  const config = new DocumentBuilder()
    .setTitle('MPI CMS Microservice APIs')
    .setDescription('Descriptions for MPI Content Management Service APIs')
    .setVersion('1.0')
    .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/api', app, document)

  // set bugsnag
  const bugsnagMiddleware = Bugsnag.getPlugin('express');
  app.use(bugsnagMiddleware.requestHandler);
  app.use(bugsnagMiddleware.errorHandler);

  try {
    throw new Error('test error bugsnag');
  } catch (e) {
    Bugsnag.notify(e);
  }

  await app.listen( process.env.PORT || 3010 );
}
bootstrap();
