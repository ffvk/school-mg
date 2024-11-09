import { Controller, Post, Put } from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { ResourceConstant } from 'src/constants/resources';
import { UsersService } from '../users/users.service';

@Controller('seeder')
export class SeederController {
  constructor(
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post()
  async seed() {
    await this.usersService.create({
      name: 'Rakesh Das',
      email: { value: 'bcarakesh03@gmail.com' },
      phone: {
        countryCode: '+91',
        number: '7076480257',
      },
      gender: 'MALE',
      password: 'rakesh',
      role: 'ADMIN',
    });
  }

  @Put('permissions')
  async updatePermissions() {
    const users = await this.usersService.get({ limit: -1, page: 1 });

    if (!users.totalCount) {
      return null;
    }

    for (let user of users.users) {
      let permissions = [];

      for (let resource of Object.keys(ResourceConstant)) {
        if (
          !ResourceConstant[resource].roles ||
          !ResourceConstant[resource].roles[user.role]
        ) {
          continue;
        }

        const token = user.tokens[0];

        const perm = {
          userId: token.userId,
          resourceId: token._id,
          resourceName: 'Tokens',
          resourceAction: resource,
          restriction: ResourceConstant[resource].roles[user.role].restriction,
        };

        permissions.push(perm);
      }

      await this.permissionsService.createMany(permissions);
    }

    return null;
  }
}
