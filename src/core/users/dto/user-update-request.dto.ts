import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { AuthUserRegistrationRequest } from '../../authentication/dto/auth-user-registration-request.dto';

export class AdditonalUserInfo {
    @ApiProperty()
    location: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    phone_number: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    dob: string;
}

export class UserUpdateRequest extends IntersectionType(
    AuthUserRegistrationRequest,
    AdditonalUserInfo
) { }