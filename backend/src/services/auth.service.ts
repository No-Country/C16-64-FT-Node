import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity';
import { UserSesion } from '../types/types';
import ServerError from '../utils/serverError';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();
@Injectable()
export class AuthService {
  private jwtServices: JwtService;
  private secret: string = process.env.SECRET_VALUE;
  constructor(jwtServices: JwtService) {
    this.jwtServices = jwtServices;
  }

  public async singIn({ username, password }: UserSesion) {
    const usernameOrMail = !username.includes('@')
      ? { username }
      : { mail: username };
    const user = await User.findOne({
      where: { ...usernameOrMail },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!user) throw new ServerError('Usuario no existente', 'NOT_FOUND');
    const pass = await this.decryptPassword(password, user.password);
    if (!pass) throw new ServerError('Contraseña Incorrecta', 'NOT_FOUND');
    const { password: _password, ...data } = user.dataValues;
    const token = this.jwtServices.sign(data, { secret: this.secret });
    return { ...data, token };
  }

  public async decryptPassword(password: string, compare: string) {
    const decrypt = await bcrypt.compare(password, compare);
    return decrypt;
  }
}
