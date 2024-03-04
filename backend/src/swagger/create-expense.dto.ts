import { ApiProperty } from '@nestjs/swagger';
import { ExpensesAtributes } from '../types/form.types.';
import { typeExpenses } from '../types/types';

export class CreateExpenseDto implements ExpensesAtributes {
  @ApiProperty({
    example: 23.12,
    description: 'Precio de la transacción',
    required: true,
  })
  amount: number;

  @ApiProperty({
    example: 'Gastos de la semana',
    description: 'Especificacion de las transacciones hechas',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 'INCOME',
    description: 'Se puede usar <b>[INCOME, OUTCOME] </b> ',
    required: true,
  })
  type: typeExpenses;

  @ApiProperty({
    example: 1,
    description: 'Id de la categoria',
    required: true,
  })
  categoryId: number;

  userId: number;

  // username: string;

  // @ApiProperty({
  //   example: 'jhondoe',
  //   description: 'contraseña del usiaro',
  //   required: true,
  // })
  // password: string;

  // @ApiProperty({
  //   example: 'jhondoe@jhondoe.com',
  //   description: 'Nombre del usuario',
  //   required: true,
  // })
  // mail: string;
}

export class UpdateExpenseDto {
  @ApiProperty({
    example: 23.12,
    description: 'Precio de la transacción',
    required: true,
  })
  amount: number;

  @ApiProperty({
    example: 'Gastos de la semana',
    description: 'Especificacion de las transacciones hechas',
    required: true,
  })
  description: string;

  // @ApiProperty({
  //   example: 'INCOME',
  //   description: 'Se puede usar <b>[INCOME, OUTCOME] </b> ',
  //   required: true,
  // })
  // type: typeExpenses;

  @ApiProperty({
    example: 1,
    description: 'Id de la categoria',
    required: true,
  })
  categoryId: number;

  // username: string;

  // @ApiProperty({
  //   example: 'jhondoe',
  //   description: 'contraseña del usiaro',
  //   required: true,
  // })
  // password: string;

  // @ApiProperty({
  //   example: 'jhondoe@jhondoe.com',
  //   description: 'Nombre del usuario',
  //   required: true,
  // })
  // mail: string;
}
