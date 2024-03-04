import { Injectable } from '@nestjs/common';
import { Category, Expenses, User } from '../entity';
import { ExpensesAtributes } from '../types/form.types.';
import ServerError from '../utils/serverError';
import { ExpensesFilter } from '../types/types';
import { Op, where } from 'sequelize';

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
      const gmt = 24 * 60 * 60 * 1000;
      const today = new Date(date).getTime();
      filter['createdAt'] = {
        [Op.gte]: new Date(today),
        [Op.lt]: new Date(today + gmt),
      };
    }
    const findExpenses = await Expenses.findAll({
      where: { userId, ...filter },
      order:["createdAt"],
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

  public async update(
    id: Expenses['id'],
    { amount, categoryId, description }: ExpensesAtributes,
  ) {
    if (!id) throw new ServerError('Opps id invalido', 'BAD_REQUEST');
    const updateExpenses = await Expenses.update(
      { amount, categoryId, description },
      { where: { id } },
    );
    return updateExpenses;
  }

  public async delete(id: Expenses['id'], userId: Expenses['userId']) {
    if (!id) throw new ServerError('Opps id invalido', 'BAD_REQUEST');
    const deleteExpenses = await Expenses.destroy({ where: { id, userId } });
    return deleteExpenses;
  }
}
