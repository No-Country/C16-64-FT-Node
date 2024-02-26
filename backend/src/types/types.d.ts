import { HttpStatus } from '@nestjs/common';

export interface NewType {
  type: string;
}
export type StatusCode = keyof typeof HttpStatus;

export interface UserSesion {
  username: string;
  password: string;
}

export type typeExpenses = 'INCOME' | 'OUTCOME';

export interface ExpensesFilter {
  limit?: number;
  offset?: number;
  date?: string;
  type?: typeExpenses;
}
