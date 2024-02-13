import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from 'src/entity';
import { config } from 'dotenv';
config();
// const configDatabase: SequelizeOptions = {
//   dialect: 'postgres',
//   host: 'q232-231-1.oregon-postgres.render.com',
//   port: 5432,
//   username: 'finance',
//   password: '1334324',
//   database: 'finance_manager_ifpq',
//   dialectOptions: { ssl: { rejectUnauthorized: false } },
// };

const DATABASE_URL = process.env.DATABASE_URL;
const options: SequelizeOptions = {
  logging: false,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
};

const useFactory = async () => {
  const sequelize = new Sequelize(DATABASE_URL, options);
  sequelize.addModels([User]);
  await sequelize.sync();
  return sequelize;
};

export const databaseProviders = [{ provide: 'SEQUELIZE', useFactory }];
