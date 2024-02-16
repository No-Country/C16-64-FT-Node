import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/services';
import { CreateUserDto } from 'src/swagger/create-user.dto';
import { UserAttributes } from 'src/types/form.types.';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private UsersService: UsersService;

  constructor(UsersService: UsersService) {
    this.UsersService = UsersService;
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Lista de Usuarios con éxito' })
  @ApiResponse({
    status: 400,
    description: 'Lista de Usuarios no pudo ser encontrado',
  })
  @Get()
  async findUsers(@Res() res: Response) {
    const result = await this.UsersService.findAll();
    res.status(HttpStatus.ACCEPTED).json(result);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'user ID', type: 'string' })
  @ApiResponse({ status: 201, description: 'Lista de Usuarios con éxito' })
  @ApiResponse({
    status: 400,
    description: 'Lista de Usuarios no pudo ser encontrado',
  })
  @Get('/:id')
  async findUser(@Param('id') id: number, @Res() res: Response) {
    const result = await this.UsersService.find(+id);
    res.status(HttpStatus.ACCEPTED).json(result);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Register Users' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Post()
  async createUser(
    @Body() body: UserAttributes,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const query = await this.UsersService.create(body);
      res.status(HttpStatus.CREATED).json(query);
    } catch (error) {
      next(error);
    }
  }

  @Delete('/:id') async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const query = await this.UsersService.delete(+id);
      res.status(HttpStatus.NO_CONTENT).json(query);
    } catch (error) {
      next(error);
    }
  }
}
