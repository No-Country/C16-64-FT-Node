import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get() async findUsers(@Res() res: Response) {
    const result = await this.UsersService.find();
    res.status(HttpStatus.ACCEPTED).json(result);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Crear Usuarios' })
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
