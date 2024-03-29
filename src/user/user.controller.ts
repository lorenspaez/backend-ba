import { Body,Controller,Get,Patch,UseGuards, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UpgradeUserDto } from './dto';
import { CreateTokenDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUserss() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('volunteers')
  getVolunteers(){
    return this.userService.getVolunteers();
  }

  @UseGuards(JwtGuard)
  @Patch('activateMode')
  activateMode(
    @GetUser('id') userId: number){
      return this.userService.activateMode(userId)
    }

  @UseGuards(JwtGuard)
  @Patch('edit')
  editUser(
    @GetUser('id') userId: number, 
    @Body() dto: EditUserDto
    ) {
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('upgrade')
  upgradeUser(
    @GetUser('id') userId: number,
    @Body() dto: UpgradeUserDto
    ) {
    return this.userService.upgradeUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUserById(
    @GetUser('id') userId: number
    ) {
    return this.userService.deleteUserById(userId);
  }

  @Patch('notification')
  setNotifications(
    @Body() dto: CreateTokenDto
    ) {
    return this.userService.setNotifications(dto);
  }
}
