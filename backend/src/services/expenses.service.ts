import { Injectable } from '@nestjs/common';
import { Category, Expenses, User } from '../entity';
import { ExpensesAtributes } from '../types/form.types.';
import ServerError from '../utils/serverError';
import { ExpensesFilter } from '../types/types';
import { Op } from 'sequelize';

@Injectable()
export class ExpensesService {
  public async findAll(
    userId: [User['id']],
    { limit, offset, type, date }: ExpensesFilter,
  ) {
    if (limit && typeof limit !== 'number')
      throw new ServerError('value in limit is not validate', 'BAD_REQUEST');
    if (offset && typeof offset !== 'number')
      throw new ServerError('value in offset is not validate', 'BAD_REQUEST');
    if (date && !new Date(date).getTime())
      throw new ServerError('value in date is not validate', 'BAD_REQUEST');

    const filter = {};
    if (type) filter['type'] = type;
    if (date) {
      const gmt = 0 * 60 * 60 * 1000;
      const today = new Date(new Date(date).getTime() + gmt);
      filter['createdAt'] = {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
        [Op.lt]: new Date(today.setHours(24, 0, 0, 0)),
      };
    }
    const findExpenses = await Expenses.findAll({
      where: { userId, ...filter },
      limit,
      offset,
    });
    return findExpenses;
  }

  public async findByDate(
    userId: [User['id']],
    { type, date }: ExpensesFilter,
  ) {
    if (date && !new Date(date).getTime())
      throw new ServerError('value in date is not validate', 'BAD_REQUEST');

    const filter = {};
    if (type) filter['type'] = type;
    if (date) {
      const gmt = 0 * 60 * 60 * 1000;
      const today = new Date(new Date(date).getTime() + gmt);
      filter['createdAt'] = {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
      };
    }
    const findExpenses = await Expenses.findAll({
      where: { userId, ...filter },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'description'],
      },
      // include: [
      //   {
      //     model: Category,
      //     as: 'category',
      //     attributes: ['name'],
      //   },
      // ],
    });
    return findExpenses;
  }

  public async create({
    amount,
    description,
    type,
    userId,
    categoryId,
  }: ExpensesAtributes) {
    const categoryid = 1;
    const createExpenses = await Expenses.create({
      amount,
      categoryId: categoryId ? categoryId : categoryid,
      description,
      type,
      userId,
    });
    return createExpenses;
  }
}
