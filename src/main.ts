import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  app.enableCors();
  app.setGlobalPrefix('api');

  if (!configService.isProduction()) {
    const options = new DocumentBuilder()
      .setTitle('Milo-o')
      .setDescription('API Description goes here')
      .setVersion('1.0.0')
      .addTag('user')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document);
  }

  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppModule.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
