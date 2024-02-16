import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerInit } from './swagger';
dotenv.config();

class ServerInit {
  private PORT: string = process.env.PORT || '3000';
  private HOST: string = process.env.HOST || 'localhost';
  private PREFIX: string = 'api/v1';
  private app: INestApplication;

  constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
    this.app.setGlobalPrefix(this.PREFIX);
    this.app.listen(this.PORT);
    new SwaggerInit(this.app);
    if (this.PORT && this.HOST) {
      const server = `http://${this.HOST}:${this.PORT}`;
      console.log(`🚀 Server deployed at: ${server}`);
      console.log(`📝 View docs at: ${server}/api-docs`);
    }
  }
}

new ServerInit();
