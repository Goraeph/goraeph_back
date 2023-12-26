import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entities';
import { BaseException } from 'src/common/interfaces/base.exception.interface';
import { PublicUserProfileDTO } from './dtos/public-user-profile.dto';
import { UserSerializer } from './interceptors/serializer';
import { CreateUserDTO } from './dtos/create-user.dto';
import { HashPassword } from './interceptors/hash-password';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @ApiOperation({ summary: 'View All Users' })
  @ApiResponse({
    description:
      'view all user. this feature intended to only using in development. DO NOT USE ON PRODUCTION LEVEL.',
    type: User,
    status: 200,
  })
  @ApiResponse({
    description: 'failed when internal server error occured.',
    type: BaseException,
    status: 404,
  })
  async viewAllUsers() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: "View one user's public profile" })
  @ApiParam({ name: 'id', type: 'number', description: "user's id" })
  @ApiResponse({
    description: "View one user's public profile",
    type: PublicUserProfileDTO,
    status: 200,
  })
  @ApiResponse({
    description: 'failed when cannot find user.',
    type: BaseException,
    status: 404,
  })
  @UserSerializer(PublicUserProfileDTO)
  async viewPublicUserProfile(@Param('id') id: number) {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ description: 'User information', type: CreateUserDTO })
  @ApiResponse({
    description:
      'Create User on development level. DO NOT USE ON PRODUCTION LEVEL.',
    type: User,
    status: 200,
  })
  @ApiResponse({
    description: 'failed when email already in use.',
    type: BaseException,
    status: 406,
  })
  @ApiResponse({
    description: 'failed when username already in use.',
    type: BaseException,
    status: 406,
  })
  @ApiResponse({
    description: 'failed when something goes wrong while creating user',
    type: BaseException,
    status: 500,
  })
  @HashPassword()
  async createUser(@Body() body: CreateUserDTO) {
    console.log(body);
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ description: 'User information', type: UpdateUserDTO })
  @ApiParam({ name: 'id', type: 'number', description: "user's id" })
  @ApiResponse({
    description: 'Update User Profile',
    type: User,
    status: 200,
  })
  @ApiResponse({
    description: 'failed when email already in use.',
    type: BaseException,
    status: 406,
  })
  @ApiResponse({
    description: 'failed when username already in use.',
    type: BaseException,
    status: 406,
  })
  @ApiResponse({
    description: 'failed when something goes wrong while updating user',
    type: BaseException,
    status: 500,
  })
  @HashPassword()
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    console.log(body);
    try {
      return await this.userService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
