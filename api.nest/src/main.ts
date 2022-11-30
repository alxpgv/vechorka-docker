import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get('corsOrigin');

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // Stripping undefined properties
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = {};
        console.log(errors);
        errors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints)
            .join('. ')
            .trim();
        });

        return new BadRequestException({ message: errorMessages });
      },
    }),
  );

  const port = configService.get('port');
  await app.listen(port);

  console.log(
    `Application is running on port: ${port}, env: ${configService.get(
      'NODE_ENV',
    )}, cors-origin: ${corsOrigin}`,
  );
}

bootstrap();
