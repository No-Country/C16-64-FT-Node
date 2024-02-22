import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import ServerError from '../utils/serverError';
import { User } from '../entity';
config();

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  private jwtServices: JwtService;
  private secret?: string = process.env.SECRET_VALUE;
  constructor(jwtServices: JwtService) {
    this.jwtServices = jwtServices;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { demo } = req.query;
      if (demo) {
        const user = await User.findOne({
          where: { username: 'demo' },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        if (!user)
          throw new ServerError('user demo could not be found', 'BAD_REQUEST');
        res.locals.userData = user.dataValues;
        next();
      } else {
        const { authorization } = req.headers;
        if (!authorization)
          throw new ServerError(
            'Error, Required Token Authorization',
            'BAD_REQUEST',
          );
        const token = authorization.split('Bearer ').at(-1);
        if (!this.secret || !token)
          throw new ServerError('Error, Secret value undefined', 'NOT_FOUND');
        const decodification = this.jwtServices.verify(token, {
          secret: this.secret,
        });
        res.locals.userData = decodification.dataValues;
        next({ patito: 'patito' });
      }
    } catch (error) {
      next(error);
    }
  }
}
