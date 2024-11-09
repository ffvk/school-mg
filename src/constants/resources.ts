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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
        restriction: 'userId',
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
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
        restriction: '',
      },
    },
  };

  //*****************************************************************//
  //************************* ORDERS ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to get (*) orders
   * @constant
   * @type {Object} GET_ORDERS
   * @default
   */
  public static readonly GET_ORDERS: IResource = {
    action: 'GET_ORDERS',
    resource: 'ORDERS',
    verb: 'GET',
    endpoint: '/orders',
    signWith: 'TOKEN',
    type: 'READ',
    name: 'List All Orders',
    description: 'Allows retrieving the list of all orders',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new order by
   * creating a new entry in db
   * @constant
   * @type {Object} CREATE_ORDERS
   * @default
   */
  public static readonly CREATE_ORDERS: IResource = {
    action: 'CREATE_ORDERS',
    resource: 'ORDERS',
    verb: 'POST',
    endpoint: '/orders',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Add a new Order',
    description: 'Allows to add a new order',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to update a order
   * @constant
   * @type {Object} UPDATE_ORDERS
   * @default
   */
  public static readonly UPDATE_ORDERS: IResource = {
    action: 'UPDATE_ORDERS',
    resource: 'ORDERS',
    verb: 'PUT',
    endpoint: '/orders',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Update an existing Order',
    description: 'Allows to update an existing order',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to delete a order
   * @constant
   * @type {Object} DELETE_ORDERS
   * @default
   */
  public static readonly DELETE_ORDERS: IResource = {
    action: 'DELETE_ORDERS',
    resource: 'ORDERS',
    verb: 'DELETE',
    endpoint: '/orders',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Delete an existing Order',
    description: 'Allows to delete an existing order',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  //*****************************************************************//
  //************************* PRODUCTS ***************************//
  //*****************************************************************//

  /**
   * @description Resource that captures the request to get (*) products
   * @constant
   * @type {Object} GET_PRODUCTS
   * @default
   */
  public static readonly GET_PRODUCTS: IResource = {
    action: 'GET_PRODUCTS',
    resource: 'PRODUCTS',
    verb: 'GET',
    endpoint: '/products',
    signWith: 'TOKEN',
    type: 'READ',
    name: 'List All Products',
    description: 'Allows retrieving the list of all products',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
      CUSTOMER: {
        role: Roles.CUSTOMER.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to add a new order by
   * creating a new entry in db
   * @constant
   * @type {Object} CREATE_PRODUCTS
   * @default
   */
  public static readonly CREATE_PRODUCTS: IResource = {
    action: 'CREATE_PRODUCTS',
    resource: 'PRODUCTS',
    verb: 'POST',
    endpoint: '/products',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Add a new Product',
    description: 'Allows to add a new product',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to update a product
   * @constant
   * @type {Object} UPDATE_PRODUCTS
   * @default
   */
  public static readonly UPDATE_PRODUCTS: IResource = {
    action: 'UPDATE_PRODUCTS',
    resource: 'PRODUCTS',
    verb: 'PUT',
    endpoint: '/products',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Update an existing Product',
    description: 'Allows to update an existing product',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  /**
   * @description Resource that captures the request to delete a product
   * @constant
   * @type {Object} DELETE_PRODUCTS
   * @default
   */
  public static readonly DELETE_PRODUCTS: IResource = {
    action: 'DELETE_PRODUCTS',
    resource: 'PRODUCTS',
    verb: 'DELETE',
    endpoint: '/products',
    signWith: 'TOKEN',
    type: 'WRITE',
    name: 'Delete an existing Product',
    description: 'Allows to delete an existing product',
    roles: {
      ADMIN: {
        role: Roles.ADMIN.role,
        restriction: '',
      },
    },
  };

  private constructor() {}
}
