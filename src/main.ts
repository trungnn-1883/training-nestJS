import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { I18nValidationPipe } from 'nestjs-i18n/dist/pipes/i18n-validation.pipe';
import { I18nValidationExceptionFilter } from 'nestjs-i18n/dist/filters/i18n-validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Training')
    .setDescription('The NestJS Training API')
    .setVersion('0.1')
    .addTag('NestJS Training')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Use the i18n validation pipe globally
  app.useGlobalPipes(new I18nValidationPipe());

  // Use the i18n exception filter to format the error responses nicely
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  await app.listen(port);
}

bootstrap();
