import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('api/user')
export class UsersController {
     constructor(private readonly usersService: UsersService) {} 
    
    @Get('by-email/:email')
    async getByEmail(@Param('email') email: string) {
        return this.usersService.getUserByEmail(email);
    }
}
