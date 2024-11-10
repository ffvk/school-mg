import { IRole } from './interfaces';

export class Roles {
  public static readonly ADMIN: IRole = {
    role: 'ADMIN',
    description: 'ADMIN users',
    childRoles: ['ADMIN', 'ROOT', 'STUDENT'],
    visible: true,
  };

  public static readonly ROOT: IRole = {
    role: 'ROOT',
    description: 'ROOT users',
    childRoles: ['ROOT', 'STUDENT'],
    visible: true,
  };

  public static readonly STUDENT: IRole = {
    role: 'STUDENT',
    description: 'STUDENT users',
    childRoles: ['STUDENT'],
    visible: true,
  };
}
