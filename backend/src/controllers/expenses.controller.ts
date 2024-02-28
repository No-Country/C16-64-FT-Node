import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Next,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ExpensesService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { ExpensesAtributes } from '../types/form.types.';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExpenseDto } from '../swagger/create-expense.dto';
import { typeExpenses } from '../types/types';

@Controller('expenses')
@ApiTags('expenses')
export class ExpensesController {
  private ExpensesService: ExpensesService;
  constructor(ExpensesService: ExpensesService) {
    this.ExpensesService = ExpensesService;
  }
  @ApiBearerAuth()
  @ApiQuery({ name: 'demo', required: false, example: 'true' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    example: '10',
    description: 'quantity of records',
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: false,
    example: '1',
    description: 'record skips',
  })
  @ApiQuery({
    name: 'type',
    type: 'string',
    required: false,
    example: 'INCOME',
    description: 'use <b>[INCOME,OUTCOME]</b>',
  })
  @ApiQuery({
    name: 'date',
    type: 'string',
    required: false,
    example: '2024-02-26T05:00:00.000Z',
  })
  @ApiOperation({ summary: 'Show Expenses' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Get()
  async findExpenses(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Query('type') type?: typeExpenses,
    @Query('date') date?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    try {
      const { id } = res.locals.userData;
      const result = await this.ExpensesService.findAll(id, {
        limit: limit ? +limit : undefined,
        offset: offset ? +offset : undefined,
        type,
        date,
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'demo', required: false, example: 'true' })
  @ApiQuery({
    name: 'type',
    type: 'string',
    required: false,
    example: 'INCOME',
    description: 'use <b>[INCOME,OUTCOME]</b>',
  })
  @ApiQuery({
    name: 'date',
    type: 'string',
    required: false,
    example: '2023-02-26',
  })
  @ApiOperation({ summary: 'Show Expenses By Date' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Usuario no pudo ser creado' })
  @Get('reports')
  async findExpensesGTE(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Query('type') type?: typeExpenses,
    @Query('date') date?: string,
  ) {
    try {
      const { id } = res.locals.userData;
      const result = await this.ExpensesService.findByDate(id, {
        type,
        date,
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
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
