import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

class ServerInit {
  private PORT: string = process.env.PORT || '3000';
  private HOST: string = process.env.HOST || 'localhost';
  private PREFIX: string = 'api/v1';
  private app: INestApplication;

  public swaggerComfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Finance Manager API')
    .setDescription('API de gestor de finanzas')
    .setVersion('3.0')
    .addTag('users')
    .build();

  constructor() {
    this.bootstrap();
    this.middlewares();
  }
  private middlewares() {}

  public async bootstrap() {
    this.app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
    this.app.setGlobalPrefix(this.PREFIX);
    // const swaggerDocument = await import('../swagger.json');
    const swaggerDocument = SwaggerModule.createDocument(
      this.app,
      this.swaggerComfig,
    );
    SwaggerModule.setup('api-docs', this.app, swaggerDocument);
    this.app.listen(this.PORT);
    if (this.PORT && this.HOST) {
      const server = `http://${this.HOST}:${this.PORT}`;
      console.log(`🚀 Server deployed at: ${server}`);
      console.log(`📝 View docs at: ${server}/api-docs`);
    }
  }
}

const server = new ServerInit();
