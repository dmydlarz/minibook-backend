import { buildImageUrl } from './utils';
import { UserEntity } from '../entities/user.entity';
import { AuthUserRegistrationResponse } from '../core/authentication/dto/auth-user-registration-response.dto';
import { PublicFileEntity } from '../entities/public-file.entity';
import { ConnectionEntity } from '../entities/connection-entity';

export const toUserDto = (data: UserEntity): any => {
  const { id, displayname, email, firstname, lastname, ...results } = data;
  const imageKey = results.avatar?.key ? results.avatar.key : 'common/default-avatar.jpg';
  console.log('do we get called?')
  const userDto: any = {
    id,
    displayname,
    email,
    avatar: buildImageUrl(imageKey),
    firstname,
    lastname,
  };
  return userDto;
};

export const toUserFullDto = (data: UserEntity): any => {
  const { id, displayname, email, firstname, lastname, ...results } = data;
  const imageKey = results.avatar ? results.avatar.key : 'common/default-avatar.jpg';
  console.log('do we get called?')

  const userDto: any = {
    id,
    displayname,
    email,
    avatar: buildImageUrl(imageKey),
    firstname,
    lastname,
    posts: [
      {
        postId: '1',
        userId: id,
        displayName: displayname,
        message: 'message 1',
      },
      {
        postId: '2',
        userId: id,
        displayName: displayname,
        message: 'message 2',
      },
      {
        postId: '3',
        userId: id,
        displayName: displayname,
        message: 'message 3',
      }

    ],
    friends: []
  };
  return userDto;
};

export const toAvatarDto = (data: any): any => {
  const { id, key, url } = data;
  return {
    success: true,
    url: buildImageUrl(key),
  };
};


export const toUserRegistrationResponseDto = (data: UserEntity): AuthUserRegistrationResponse => {
  const { id, email, displayname } = data;
  return {
    userId: id,
    email: email,
    displayname: displayname,
  }
}

export const toUserReponseDto = (data: UserEntity): UserResponseDto => {
  if(!data)
    return
  const _avatar = buildAvatar(data.avatar);
  return {
    id: data.id,
    birthday: data.birthday,
    country: data.country,
    created_at: data.created_at,
    displayname: data.displayname,
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    gender: data.gender,
    location: data.location,
    isPublished: data.isPublished,
    phonenumber: data.phonenumber,
    followers: data.followers,
    following: data.following,
    avatar: _avatar,
  }
}

function buildAvatar(avatar: PublicFileEntity) {
  return avatar ? buildImageUrl(avatar.key) : 'https://imgs.minibook.io/common/default-avatar.jpg'
}

export class UserResponseDto {
  id: number;
  birthday: string;
  country: string;
  created_at: Date;
  displayname: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  location: string;
  isPublished: boolean;
  phonenumber: string;
  followers: ConnectionEntity[];
  following: ConnectionEntity[];
  avatar: string;
}