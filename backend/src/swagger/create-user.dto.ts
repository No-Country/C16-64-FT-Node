import { ApiProperty } from '@nestjs/swagger';
import { UserAttributes } from 'src/types/form.types.';

export class CreateUserDto implements UserAttributes {
  @ApiProperty({
    example: 'jhondoe@jhondoe.com',
    description: 'Nombre del usuario',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'jhondoe',
    description: 'contraseña del usiaro',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'jhondoe@jhondoe.com',
    description: 'Nombre del usuario',
    required: true,
  })
  mail: string;
}
