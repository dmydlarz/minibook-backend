import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import { AuthUserRegistrationRequest } from '../../authentication/dto/auth-user-registration-request.dto';
import { UserUpdateRequest } from '../dto/user-update-request.dto';
import { PublicFileEntity } from '../../../entities/public-file.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async createUser(userRegistrationDto: AuthUserRegistrationRequest): Promise<UserEntity> {
        const { displayname, email, firstname, lastname, password } = userRegistrationDto;

        const _user = new UserEntity();

        _user.displayname = displayname;
        _user.email = email;
        _user.firstname = firstname;
        _user.lastname = lastname;
        _user.password = password;

        await _user.save()

        return _user;
    }

    async updateUser(userUpdateRequestDto: UserUpdateRequest, currentUserEntity: UserEntity): Promise<UserEntity> {
        const { displayname, country, dob, email, firstname, gender, lastname, location, password, phone_number } = userUpdateRequestDto;

        currentUserEntity.email = email;
        currentUserEntity.password = password;
        currentUserEntity.displayname = displayname;
        currentUserEntity.firstname = firstname;
        currentUserEntity.lastname = lastname;

        await currentUserEntity.save();

        return currentUserEntity;
    }

    async updateAvatar(avatarPublicFileEntity: PublicFileEntity, currentUserEntity: UserEntity): Promise<UserEntity> {
        currentUserEntity.avatar = avatarPublicFileEntity;
        await currentUserEntity.save();
        return currentUserEntity;
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.findOne({ where: { email } });
    }

    async isExists(email: string): Promise<boolean> {
        return !!await this.findOne({where: {email}});
    }
}