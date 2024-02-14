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

export interface UserAtrributes {
  username: string;
  password: string;
  phone: string;
}

@Table
export class User extends Model implements UserAtrributes {
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

  @Unique
  @Column({ allowNull: false, type: DataType.STRING })
  phone: string;

  @HasOne(() => Profile)
  profile: Profile;

  @HasMany(() => Expenses)
  expenses: Expenses[];
}
