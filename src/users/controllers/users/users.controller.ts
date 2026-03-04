import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':userId')
    getOne(@Param('userId', ParseIntPipe) userId: number){
        return this.usersService.findOne(userId);
    }

    @Post()
    createUser(@Body() payload: CreateUserDto){
        return this.usersService.create(payload);
    }

    @Put(':userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() payloadUpdated: UpdateUserDto){
        return this.usersService.updateUser(userId, payloadUpdated);
    }

    @Delete(':userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number){
        this.usersService.deleteUser(userId);
    }

}
