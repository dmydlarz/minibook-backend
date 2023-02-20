import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRequest } from '../../common/decorator';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { ConnectionEntity } from '../../entities/connection-entity';
import { toUserReponseDto, UserResponseDto } from '../../common/mapper';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) { }

  @Get()
  findAll(): Promise<UserEntity[]> {
    const _data = this.usersService.findAll();
    return _data;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async myProfile(@UserRequest() user): Promise<UserResponseDto> {
    const _data = await this.usersService.findOneByEmail(user.email)
    const _response = toUserReponseDto(_data);
    return _response;
  }

  @Get('followings')
  @UseGuards(JwtAuthGuard)
  async getFollowing(@UserRequest() user): Promise<UserResponseDto[]> {
    const _data = (await this.usersService.followings(user)).map(data => {
      console.log(data);
      return toUserReponseDto(data.followers)
    });
    return _data
  }

  @Get('followers')
  @UseGuards(JwtAuthGuard)
  async getFollowers(@UserRequest() user): Promise<UserResponseDto[]> {
    const _data = (await this.usersService.followers(user)).map(data => {
      console.log(data);
      return toUserReponseDto(data.following)
    });
    return _data
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const _data = await this.usersService.findOneById(+id);
    const _response = toUserReponseDto(_data);
    return _response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userUpdateRequest: UserUpdateRequest): Promise<UserResponseDto> {
    const _data = await this.usersService.update(+id, userUpdateRequest);
    const _response = toUserReponseDto(_data);
    return _response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    const _data = await this.usersService.remove(+id);
    const _response = toUserReponseDto(_data);
    return _response;
  }

  @Get('friends/me')
  @UseGuards(JwtAuthGuard)
  getFriends(@UserRequest() user) {
    const _data = this.usersService.findFriends();
    return _data;
  }


  @Get(':id/follow')
  @UseGuards(JwtAuthGuard)
  follow(@Param('id') id: string, @UserRequest() user): Promise<ConnectionEntity> {
    const _data = this.usersService.follow(+id, user);
    return _data;
  }

}
