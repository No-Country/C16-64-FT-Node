import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { typeExpenses } from '../types/types';
import { Expenses } from './expenses.entity';

@Table({ timestamps: false })
export class Category extends Model {
  @PrimaryKey
  @AllowNull
  @Unique
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.TEXT })
  typeCategory: typeExpenses;

  @HasMany(() => Expenses)
  expenses: Expenses;
}
