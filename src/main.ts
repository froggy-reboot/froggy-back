import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as https from 'https';
import * as http from 'http';

async function bootstrap() {
  const httpsOptions = {
    // key: fs.readFileSync('./config/create-cert-key.pem'),
    // cert: fs.readFileSync('./config/create-cert.pem'),
  };

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get<ConfigService>(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  http.createServer(server).listen(configService.get('app.port'));
  // https
  //   .createServer(httpsOptions, server)
  //   .listen(configService.get('app.httpsPort'));
  https.createServer(httpsOptions, server).listen(4040);

  app.init();
}
void bootstrap();
