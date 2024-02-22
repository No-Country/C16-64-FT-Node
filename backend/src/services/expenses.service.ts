import { Injectable } from '@nestjs/common';
import { Expenses, User } from '../entity';
import { ExpensesAtributes } from '../types/form.types.';
import ServerError from '../utils/serverError';

@Injectable()
export class ExpensesService {
  public async findAll(userId: [User['id']]) {
    const findExpenses = await Expenses.findAll({ where: { userId } });
    return findExpenses;
  }

  public async create({
    amount,
    description,
    type,
    userId,
  }: ExpensesAtributes) {
    const categoryId = 1;
    const createExpenses = await Expenses.create({
      amount,
      categoryId,
      description,
      type,
      userId,
    });
    return createExpenses;
  }
}
