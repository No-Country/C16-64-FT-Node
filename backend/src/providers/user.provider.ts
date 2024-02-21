import { User } from '../entity/user.entity';

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
