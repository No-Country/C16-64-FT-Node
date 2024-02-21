import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from '../services';
import { AuthDto } from '../swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  // @Get()
  // getAuthInfo(
  //   @Param('id') id: string,
  //   @Query() queries: { [key: string]: any },
  //   @Res() res: Response,
  // ): void {
  //   const statusBoolean = false;
  //   if (statusBoolean)
  //     throw new ServerError('Error de prueba no identificado', 'BAD_REQUEST');
  //   const jsonData = { message: 'Hello world!', id, queries };
  //   res.status(200).json(jsonData);
  // }
  @ApiBody({ type: AuthDto })
  @ApiOperation({ summary: 'Login Users' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Post('/login')
  async createAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { body } = req;
    const token = await this.AuthService.singIn(body);
    res.status(200).json({ token });
  }

  // @Put() updateAuth(
  //   @Body() body: any,
  //   @Param('id') id: number,
  //   @Res() res: Response,
  // ): void {
  //   res.status(201).json({ id, body, pat: 'pat' });
  // }
}
