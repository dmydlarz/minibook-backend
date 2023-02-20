import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { ConnectionEntity } from '../../entities/connection-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ConnectionEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
