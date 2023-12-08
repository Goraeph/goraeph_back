import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @ApiOperation({ summary: 'View All Users' })
  @ApiResponse({ status: 403, description: 'forbidden.' })
  viewAllUsers() {
    return this.userService.findAll();
  }
}
