import { RoleEnum } from '../enums/role.enum';

export interface User {
  name: string;
  password?: string;
  role: RoleEnum;
}
