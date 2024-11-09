import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ErrorConstant } from 'src/constants/error';
import { RestrictUsersGuard } from 'src/shared/guards/restrictors/restrict-users/restrict-users.guard';
import { UserIdGuard } from 'src/shared/guards/validators/user-id/user-id.guard';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { GetUsersDTO } from './dtos/get-users.dto/get-users.dto';
import { LoginUserDTO } from './dtos/login-user.dto/login-user.dto';
import { RegisterUserDTO } from './dtos/register-user.dto/register-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto/update-user.dto';
import { User } from './models/user/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RestrictUsersGuard)
  async getUsers(@Query() getUsersDTO: GetUsersDTO) {
    return await this.usersService.get(getUsersDTO);
  }

  @Post()
  @UseGuards()
  async registerUser(@Body() registerUserDTO: RegisterUserDTO) {
    return await this.usersService.create(registerUserDTO);
  }

  @Put()
  @UseGuards(UserIdGuard)
  async updateUser(@Body() updateUserDTO: UpdateUserDTO) {
    return await this.usersService.update(updateUserDTO);
  }

  @Delete()
  @UseGuards(UserIdGuard)
  async deleteUser(@Body('userId', ParseMongoIdPipe) userId: string) {
    return await this.usersService.delete(userId);
  }

  @Post('session/email')
  @UseGuards()
  async loginUser(@Body() loginUserDTO: LoginUserDTO) {
    const foundUser = await this.usersService.get({
      emailValue: loginUserDTO.emailValue,
      fields: 'password',
    });

    if (!foundUser?.totalCount) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'Email',
        },
      });
    }

    if (
      !(await User.comparePassword(
        loginUserDTO.password,
        foundUser.users[0].password.hash,
      ))
    ) {
      throw new BadRequestException({
        error: ErrorConstant.INVALID_FIELD,
        msgVars: {
          field: 'Password',
        },
      });
    }

    return (
      await this.usersService.get({
        emailValue: loginUserDTO.emailValue,
        populate: 'tokens',
      })
    ).users[0];
  }
}
