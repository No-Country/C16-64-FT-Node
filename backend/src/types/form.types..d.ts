import { typeExpenses } from './types';

export interface UserAttributes {
  username: string;
  password: string;
  mail: string;
}

export interface ProfileAttributes {
  phone: string;
  name: string;
  lastname: string;
  image?: string;
}

export interface AuthAtributes {
  username: string;
  password: string;
}

export interface ExpensesAtributes {
  amount: number;
  description: string;
  type: typeExpenses;
  categoryId: number;
  userId: number;
}
