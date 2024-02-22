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
  Unique,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { ProfileAttributes } from '../types/form.types.';

@Table({ timestamps: false })
export class Profile extends Model implements ProfileAttributes {
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

  @Column({ type: DataType.STRING })
  image: string;

  @Unique
  @Column({ allowNull: false, type: DataType.STRING })
  phone: string;

  @ForeignKey(() => User)
  @Column({ field: 'userId' })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
