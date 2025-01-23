import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/Interceptor/response.Interceptor';
import { ValidationExceptionFilter } from './common/Filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    allowedHeaders: '*', 
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('/api');

  await app.listen(3000);
}
bootstrap();
 