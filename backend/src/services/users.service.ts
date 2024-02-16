import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import ServerError from 'src/utils/serverError';
import { UserAttributes } from 'src/types/form.types.';

@Injectable()
export class UsersService {
  private saltOrRounds: number = 10;

  constructor() {}

  public async find() {
    const result = await User.findAll();
    return result;
  }

  public async create({ username, ...data }: UserAttributes) {
    const password = await this.hashingPassword(data.password);
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
