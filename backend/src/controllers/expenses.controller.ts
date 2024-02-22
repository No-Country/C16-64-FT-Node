import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Next,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ExpensesService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { ExpensesAtributes } from '../types/form.types.';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExpenseDto } from '../swagger/create-expense.dto';

@Controller('expenses')
@ApiTags('expenses')
export class ExpensesController {
  private ExpensesService: ExpensesService;
  constructor(ExpensesService: ExpensesService) {
    this.ExpensesService = ExpensesService;
  }

  @ApiQuery({ name: 'demo', required: false, example: 'true' })
  @ApiOperation({ summary: 'Show Expenses' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Get()
  async findExpenses(@Res() res: Response) {
    const { id } = res.locals.userData;
    const result = await this.ExpensesService.findAll(id);
    res.status(HttpStatus.OK).json(result);
  }

  @ApiBody({ type: CreateExpenseDto })
  @ApiQuery({ name: 'demo', required: false, example: 'true' })
  @ApiOperation({ summary: 'Register Expenses' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Post()
  async createExpenses(
    @Body() body: Omit<ExpensesAtributes, 'userId'>,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { id: userId } = res.locals.userData;
      const query = await this.ExpensesService.create({ userId, ...body });
      res.status(HttpStatus.ACCEPTED).json(query);
    } catch (error) {
      next(error);
    }
  }
}
