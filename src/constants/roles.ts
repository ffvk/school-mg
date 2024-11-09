import { IRole } from './interfaces';

export class Roles {
  public static readonly ADMIN: IRole = {
    role: 'ADMIN',
    description: 'ADMIN users',
    childRoles: ['ADMIN', 'CUSTOMER'],
    visible: true,
  };

  public static readonly CUSTOMER: IRole = {
    role: 'CUSTOMER',
    description: 'CUSTOMER users',
    childRoles: ['CUSTOMER'],
    visible: true,
  };
}
