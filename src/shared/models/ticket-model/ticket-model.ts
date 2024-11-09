// import { Organization } from 'src/app-modules/organizations/models/organization/organization';
import { Permission } from 'src/app-modules/permissions/models/permission/permission';
// import { Team } from 'src/app-modules/teams/models/team/team';
import { Token } from 'src/app-modules/tokens/models/token/token';
import { User } from 'src/app-modules/users/models/user/user';
import { IResource } from 'src/constants/interfaces';

export class TicketModel {
  // private _teams: Team[];
  private _user: User;
  private _token: Token;
  private _permission: Permission;
  private _resourceConstant: IResource;

  private constructor() {}

  public static fromToken(
    token: Token,
    resourceConstant: IResource,
  ): TicketModel {
    let ticket = new TicketModel();

    if (typeof token.userId === 'object') {
      ticket._user = token.userId;
      ticket._user.userId = ticket._user._id;

      // if (Array.isArray(ticket._user['teams'])) {
      //   ticket._teams = ticket._user['teams'];
      //   for (let team of ticket._teams) {
      //     team.teamId = team._id;
      //   }
      // }

      token.userId = ticket._user._id;
    }

    // if (typeof token.organizationId === 'object') {
    //   ticket._organization = token.organizationId;
    //   ticket._organization.organizationId = ticket._organization._id;
    //   token.organizationId = ticket._organization._id;
    // }

    ticket._token = token;

    ticket._resourceConstant = resourceConstant;

    return ticket;
  }

  public static fromRSK(user: User, resourceConstant: IResource) {
    let ticket = new TicketModel();

    ticket._user = user;
    ticket._resourceConstant = resourceConstant;

    // this could be replaced with finding the default token instead of first token
    ticket._token = user.tokens && user.tokens[0];

    return ticket;
  }

  // get organization(): Organization {
  //   return this._organization;
  // }

  // get teams(): Team[] {
  //   return this._teams;
  // }

  get user(): User {
    return this._user;
  }

  get token(): Token {
    return this._token;
  }

  get permission(): Permission {
    return this._permission;
  }

  get resourceConstant(): IResource {
    return this._resourceConstant;
  }

  set permission(value: Permission) {
    this._permission = value;
  }
}
