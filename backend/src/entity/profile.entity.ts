import { type } from 'os';
import { argv } from 'process';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { typeExpenses } from 'src/types/types';
import { User } from './user.entity';

@Table({ timestamps: false })
export class Profile extends Model {
  @PrimaryKey
  @AllowNull
  // @AutoIncrement
  @Column({
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  lastname: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
    validate: { isEmail: true },
  })
  mail: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.TEXT })
  typeCategory: typeExpenses;

  @ForeignKey(() => User)
  @Column({ field: 'userId' })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
