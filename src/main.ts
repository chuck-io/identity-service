import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = appContext.get(ConfigService);

  // Boilerplate: TCP microservice transport (can be changed later to NATS/RMQ/Kafka/etc).
  const host = config.get<string>('MICROSERVICE_HOST', '0.0.0.0');
  const port = config.get<number>('MICROSERVICE_PORT', 3001);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { host, port },
  });

  await microservice.listen();
}

void bootstrap();

