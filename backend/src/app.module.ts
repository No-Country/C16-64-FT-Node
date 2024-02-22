import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule, UsersModule, ExpensesModule } from './modules';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { CorsMiddleware, ErrorMiddleware } from './middlewares';
import { AuthService, UsersService, ExpensesService } from './services';
import {
  AuthController,
  UsersController,
  ExpensesController,
} from './controllers';

@Module({
  imports: [AuthModule, UsersModule, ExpensesModule],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    ExpensesController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    { provide: APP_FILTER, useClass: ErrorMiddleware },
    ExpensesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
