import { RoleEnum } from '../enums/role.enum';
import { User } from '../interfaces/user.interface';

export const mockUsers: User[] = [
  {
    name: 'john',
    password : 'hashedPassword',
    role: RoleEnum.AGENT,
  },
  {
    name: 'sandy',
    password : 'hashedPassword',
    role: RoleEnum.AGENT,
  },
  {
    name: 'pablo',
    password : 'hashedPassword',
    role: RoleEnum.MANAGER,
  },
]