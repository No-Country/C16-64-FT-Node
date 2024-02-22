import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpensesController } from '../controllers/expenses.controller';
import { ExpensesService } from '../services';
import { AuthenticateMiddleware } from '../middlewares/autenthicate.middleware';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('/expenses');
  }
}
