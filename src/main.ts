import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT')|| 8080;



  await app.listen(PORT, () => {
    console.log(`app listen on http://localhost:${PORT}`);
  });
}
bootstrap();
