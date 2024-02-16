import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  HasMany,
  HasOne,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { Expenses } from './expenses.entity';
import { Profile } from './profile.entity';
import { UserAttributes } from 'src/types/form.types.';

@Table
export class User extends Model implements UserAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false, unique: true, type: DataType.INTEGER })
  id: number;

  @AllowNull
  @Unique
  @Column({ allowNull: false, type: DataType.STRING })
  username: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
    validate: { isEmail: true },
  })
  mail: string;

  @HasOne(() => Profile)
  profile: Profile;

  @HasMany(() => Expenses)
  expenses: Expenses[];
}
