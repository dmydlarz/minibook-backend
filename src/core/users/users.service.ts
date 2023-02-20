import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserEntity } from '../../entities/user.entity';
import { AuthUserRegistrationRequest } from '../authentication/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionEntity } from '../../entities/connection-entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ConnectionEntity)
    private readonly followersRepository: Repository<ConnectionEntity>
  ) { }

  create(userRegistrationDto: AuthUserRegistrationRequest): Promise<UserEntity> {
    const { displayname, email, firstname, lastname, password } = userRegistrationDto;
    const _user = new UserEntity();
    _user.displayname = displayname;
    _user.email = email;
    _user.firstname = firstname;
    _user.lastname = lastname;
    _user.password = password;

    return this.userRepository.save(_user);
  }

  // maybe handle error handling here?
  findOneByOptions(options?: object): Promise<UserEntity> {
    return this.userRepository.findOne(options);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.findOneByOptions({ where: { id: id }, relations: ['followers', 'following'] })
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.findOneByOptions({ where: { email: email }, relations: ['followers', 'following'] })
  }

  findOneByDisplayName(displayname: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { displayname: displayname, isPublished: true } });
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest): Promise<UserEntity> {
    await this.userRepository.update(id, userUpdateRequest);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<UserEntity> {
    const _user = await this.findOneById(id);
    return this.userRepository.remove(_user)
  }

  async followings(user: any): Promise<ConnectionEntity[]> {
    return await this.followersRepository.find({ where: { following: user.id }, relations: ['followers'] });
  }

  async followers(user: any): Promise<ConnectionEntity[]> {
    return await this.followersRepository.find({ where: { followers: user.id }, relations: ['following'] });
  }

  async follow(id: number, user: any): Promise<ConnectionEntity> {
    // current user (6) Dave
    const _follower = await this.findOneById(user.id);
    // current user -> following -> other user (1) John
    const _following = await this.findOneById(id);
    const _connection = new ConnectionEntity()
    // (6)
    _connection.followers = _following;
    // (1)
    _connection.following = _follower;
    return await this.followersRepository.save(_connection);
  }

  findFriends() {
    throw new Error('Method not implemented.');
  }
}
