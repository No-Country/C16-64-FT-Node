import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from 'src/controllers';
import { UsersService } from 'src/services';
import { DatabaseModule } from './database.module';
import { AuthenticateMiddleware } from 'src/middlewares/autenthicate.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  private excludePaths = [{ path: '/users', method: RequestMethod.POST }];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(...this.excludePaths)
      .forRoutes('/users');
  }
}
