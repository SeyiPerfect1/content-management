// import { config } from "dotenv";
// config({ path: `../${process.env.NODE_ENV}.env` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT')|| 8080;

  // // Swagger
  // const options = new DocumentBuilder()
  //   .setTitle('UE API')
  //   .setDescription('...')
  //   .setVersion('1.0')
  //   .addTag('v1')
  //   .setContact(
  //     'UEBERBIT GmbH',
  //     'https://www.ueberbit.de/',
  //     'contact [at] ueberbit.de',
  //   )
  //   .addBearerAuth(); // optional if any route has bearer authentication

  // const doc = options.build();

  // const document = SwaggerModule.createDocument(app, doc);
  // SwaggerModule.setup('/api/v1/', app, document);

  await app.listen(PORT, () => {
    console.log(`app listen on http://localhost:${PORT}`);
  });
}
bootstrap();
