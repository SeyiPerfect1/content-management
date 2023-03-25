import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
