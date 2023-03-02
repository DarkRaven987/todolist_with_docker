import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.SERVICE_PORT || 3000;
  const microserviceHost = process.env.MICROSERVICE_HOST || 'localhost';
  const microservicePort = process.env.MICROSERVICE_PORT || 4002;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: microserviceHost,
      port: microservicePort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`AUTH microservice is running on port ${microservicePort}`);
  Logger.log(`AUTH service is running on port ${port}`);
}
bootstrap();
