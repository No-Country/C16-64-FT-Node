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
} from 'sequelize-typescript';
import { typeExpenses } from 'src/types/types';
import { User } from './user.entity';
import { Category } from './category.entity';

@Table
export class Expenses extends Model {
  @PrimaryKey
  @AllowNull
  @Unique
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @AllowNull
  @Column({ type: DataType.FLOAT })
  amount: number;

  @AllowNull
  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.TEXT })
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
