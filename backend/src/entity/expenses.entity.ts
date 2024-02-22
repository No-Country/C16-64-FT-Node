import { argv } from 'process';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  Unique,
  Validate,
} from 'sequelize-typescript';
import { typeExpenses } from '../types/types';
import { User } from './user.entity';
import { Category } from './category.entity';
import { ExpensesAtributes } from '../types/form.types.';

enum TypeExpenses {
  INCOME,
  EXPENDITURE,
}

@Table
export class Expenses extends Model implements ExpensesAtributes {
  @PrimaryKey
  @AllowNull
  @Unique
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @AllowNull
  @Validate({
    isNumeric: { msg: 'Value is not number' },
    notEmpty: true,
  })
  @Column({ type: DataType.FLOAT })
  amount: number;

  @AllowNull
  @Column({ type: DataType.STRING })
  description: string;

  @AllowNull
  @Validate({
    isIn: { args: [['INCOME', 'EXPENDITURE']], msg: 'Type value not allowed' },
  })
  @Column({
    type: DataType.STRING,
  })
  type: typeExpenses;

  @ForeignKey(() => User)
  @AllowNull
  @Column({ type: DataType.INTEGER, field: 'userId' })
  userId: number;

  @ForeignKey(() => Category)
  @AllowNull
  @Column({ type: DataType.INTEGER, field: 'categoryId' })
  categoryId: number;

  @BelongsTo(() => User)
  category: Category;
}
