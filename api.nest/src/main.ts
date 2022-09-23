import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('corsOrigin') || '*',
    credentials: true,
  });

  const port = configService.get('port');
  await app.listen(port);

  console.log(
    `Application is running on port: ${port}, env: ${configService.get(
      'NODE_ENV',
    )}`,
  );
}

bootstrap();
