import { User } from 'src/entity';
import { UsersService } from 'src/services';

class InitialSeed {
  constructor() {
    this.users();
  }
  async users() {
    const usersToCreate = [
      {
        username: 'User1',
        phone: '+513',
        password: 'admin',
      },
      {
        username: 'User12',
        phone: '+51332',
        password: 'admin',
      },
    ];
    const { hashingPassword } = new UsersService();
    const usersParsing = usersToCreate.map(({ password: pwd, ...data }) => {
      const password = hashingPassword(pwd);
      return { ...data, password };
    });
    const createManyUsers = await User.bulkCreate(usersParsing);
    return createManyUsers;
  }
}

export default InitialSeed;
