import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
constructor(private readonly userService: UserService) {}
      

// localhost:3000/users
  @Get()  
  getUsers(): any {
    return this.userService.getUsers();
  }

// localhost:3000/users/cm02gx1wb0000k8hi0kj2e6xd
  @Get('/:userId')  
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser({
      userId,
    });
  }
}
