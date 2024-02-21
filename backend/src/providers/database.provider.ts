import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Category, Expenses, Profile, User } from '../entity';
import { config } from 'dotenv';
config();

const DATABASE_URL = process.env.DATABASE_URL;
const options: SequelizeOptions = {
  logging: false,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
};

const useFactory = async () => {
  const sequelize = new Sequelize(DATABASE_URL, options);
  sequelize.addModels([User, Profile, Expenses, Category]);
  await sequelize.sync();
  return sequelize;
};

export const databaseProviders = [{ provide: 'SEQUELIZE', useFactory }];
