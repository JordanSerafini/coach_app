import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  });
  app.listen();
  console.log('Courses service is listening on port 3002');
}
bootstrap();
