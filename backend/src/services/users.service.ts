import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import ServerError from '../utils/serverError';
import { UserAttributes } from '../types/form.types.';
import { Profile } from '../entity';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  private saltOrRounds: number = 10;

  constructor() {}

  public async findAll() {
    const result = await User.findAll();
    return result;
  }

  public async find(id: User['id']) {
    if (!id) throw new ServerError('Opss!, Invalid ID', 'BAD_REQUEST');
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [{ model: Profile, attributes: ['name', 'lastname'] }],
    });
    if (!user)
      throw new ServerError('No se pudo encontrar al usuario', 'NOT_FOUND');
    return user;
  }

  public async create({ username, password: pass, ...data }: UserAttributes) {
    const findUser = await User.findOne({
      where: { [Op.or]: [{ username }, { mail: data.mail }] },
    });
    if (findUser) throw new ServerError('user already exists', 'BAD_REQUEST');
    const password = await this.hashingPassword(pass);
    const createUser = await User.create({ username, password, ...data });
    return createUser;
  }

  public async hashingPassword(password: string) {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return hash;
  }

  public async delete(id: User['id']) {
    if (!id) throw new ServerError('Opss!, Invalid ID', 'BAD_REQUEST');
    const deleteUser = await User.destroy({ where: { id: 2 } });
    if (!deleteUser)
      throw new ServerError(
        'Usuario No encontrado en los registros',
        'BAD_REQUEST',
      );
    return deleteUser;
  }
}
