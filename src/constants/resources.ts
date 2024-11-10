import { IResource } from './interfaces';
import { Roles } from './roles';

export class ResourceConstant {
  //*****************************************************************//
  //************************* SEEDER ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to create metrics
   * @constant
   * @type {Object} SEED
   * @default
   */
  public static readonly SEED: IResource = {
    action: 'SEED',
    resource: 'SEEDER',
    verb: 'POST',
    endpoint: '/seeder',
    signWith: '',
    type: 'WRITE',
    name: 'Create core accounts',
    description: 'Create core accounts',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to create metrics
   * @constant
   * @type {Object} UPDATE_PERMISSIONS
   * @default
   */
  public static readonly UPDATE_PERMISSIONS: IResource = {
    action: 'UPDATE_PERMISSIONS',
    resource: 'SEEDER',
    verb: 'PUT',
    endpoint: '/seeder/permissions',
    signWith: '',
    type: 'WRITE',
    name: 'Update existing user permissions',
    description: 'Update existing user permissions',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  //*****************************************************************//
  //************************* USERS ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to get (*) users
   * @constant
   * @type {Object} GET_USERS
   * @default
   */
  public static readonly GET_USERS: IResource = {
    action: 'GET_USERS',
    resource: 'USERS',
    verb: 'GET',
    endpoint: '/users',
    signWith: 'TOKEN',
    type: 'READ',
    name: 'List All Users',
    description: 'Allows retrieving the list of all users',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new user by
   * creating a new entry in db
   * @constant
   * @type {Object} REGISTER_USERS
   * @default
   */
  public static readonly REGISTER_USERS: IResource = {
    action: 'REGISTER_USERS',
    resource: 'USERS',
    verb: 'POST',
    endpoint: '/users',
    signWith: '',
    type: 'WRITE',
    name: 'Register a new User',
    description: 'Allows to add a new user',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new user by
   * creating a new entry in db
   * @constant
   * @type {Object} UPDATE_USERS
   * @default
   */

  public static readonly UPDATE_USERS: IResource = {
    action: 'UPDATE_USERS',
    resource: 'USERS',
    verb: 'PUT',
    endpoint: '/users',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Register a new User',
    description: 'Allows to add a new user',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to login an existing user by
   * validating an existing entry in db
   * @constant
   * @type {Object} LOGIN_USER
   * @default
   */
  public static readonly LOGIN_USERS: IResource = {
    action: 'LOGIN_USER',
    resource: 'USERS',
    verb: 'POST',
    endpoint: '/users/session/email',
    signWith: '',
    type: 'WRITE',
    name: 'Login an existing User',
    description: 'Allows to login an existing user',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to login an existing user by
   * validating an existing entry in db
   * @constant
   * @type {Object} LOGOUT_USER
   * @default
   */
  public static readonly LOGOUT_USERS: IResource = {
    action: 'LOGOUT_USER',
    resource: 'USERS',
    verb: 'DELETE',
    endpoint: '/users/session',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Logout an existing User',
    description: 'Allows to logout an existing user',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to delete a user
   * @constant
   * @type {Object} DELETE_USER
   * @default
   */
  public static readonly DELETE_USERS: IResource = {
    action: 'DELETE_USERS',
    resource: 'USERS',
    verb: 'DELETE',
    endpoint: '/users',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Delete an existing User',
    description: 'Allows to delete an existing user',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  //*****************************************************************//
  //************************* SUBJETECTS ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to get (*) subjects
   * @constant
   * @type {Object} GET_SUBJETECTS
   * @default
   */
  public static readonly GET_SUBJETECTS: IResource = {
    action: 'GET_SUBJETECTS',
    resource: 'SUBJETECTS',
    verb: 'GET',
    endpoint: '/subjects',
    signWith: 'TOKEN',
    type: 'READ',
    name: 'List All Subjects',
    description: 'Allows retrieving the list of all subjects',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new subject by
   * creating a new entry in db
   * @constant
   * @type {Object} CREATE_SUBJETECTS
   * @default
   */
  public static readonly CREATE_SUBJETECTS: IResource = {
    action: 'CREATE_SUBJETECTS',
    resource: 'SUBJETECTS',
    verb: 'POST',
    endpoint: '/subjects',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Add a new Subject',
    description: 'Allows to add a new subject',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to update a subject
   * @constant
   * @type {Object} UPDATE_SUBJETECTS
   * @default
   */
  public static readonly UPDATE_SUBJETECTS: IResource = {
    action: 'UPDATE_SUBJETECTS',
    resource: 'SUBJETECTS',
    verb: 'PUT',
    endpoint: '/subjects',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Update an existing Subject',
    description: 'Allows to update an existing subject',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to delete a subject
   * @constant
   * @type {Object} DELETE_SUBJETECTS
   * @default
   */
  public static readonly DELETE_SUBJETECTS: IResource = {
    action: 'DELETE_SUBJETECTS',
    resource: 'SUBJETECTS',
    verb: 'DELETE',
    endpoint: '/subjects',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Delete an existing Subject',
    description: 'Allows to delete an existing subject',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  //*****************************************************************//
  //************************* SCLASSES ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to get (*) sclasses
   * @constant
   * @type {Object} GET_SCLASSES
   * @default
   */
  public static readonly GET_SCLASSES: IResource = {
    action: 'GET_SCLASSES',
    resource: 'SCLASSES',
    verb: 'GET',
    endpoint: '/sclasses',
    signWith: 'TOKEN',
    type: 'READ',
    name: 'List All Sclasses',
    description: 'Allows retrieving the list of all sclasses',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
      STUDENT: {
        role: Roles.STUDENT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new sclass by
   * creating a new entry in db
   * @constant
   * @type {Object} CREATE_SCLASSES
   * @default
   */
  public static readonly CREATE_SCLASSES: IResource = {
    action: 'CREATE_SCLASSES',
    resource: 'SCLASSES',
    verb: 'POST',
    endpoint: '/sclasses',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Add a new Sclass',
    description: 'Allows to add a new sclass',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },

      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to update a sclass
   * @constant
   * @type {Object} UPDATE_SCLASSES
   * @default
   */
  public static readonly UPDATE_SCLASSES: IResource = {
    action: 'UPDATE_SCLASSES',
    resource: 'SCLASSES',
    verb: 'PUT',
    endpoint: '/sclasses',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Update an existing Sclass',
    description: 'Allows to update an existing sclass',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to delete a sclass
   * @constant
   * @type {Object} DELETE_SCLASSES
   * @default
   */
  public static readonly DELETE_SCLASSES: IResource = {
    action: 'DELETE_SCLASSES',
    resource: 'SCLASSES',
    verb: 'DELETE',
    endpoint: '/sclasses',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Delete an existing Sclass',
    description: 'Allows to delete an existing sclass',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },

      ROOT: {
        role: Roles.ROOT.role,
        restriction: '',
      },
    },
  };

  private constructor() {}
}
