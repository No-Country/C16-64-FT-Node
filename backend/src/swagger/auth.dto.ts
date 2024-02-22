import { ApiProperty } from '@nestjs/swagger';
import { AuthAtributes } from '../types/form.types.';

export class AuthDto implements AuthAtributes {
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
}
