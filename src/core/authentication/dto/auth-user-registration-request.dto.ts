import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class AuthUserRegistrationRequest {
    @IsNotEmpty()
    @Min(4)
    @ApiProperty({
        description: 'The display name for the user',
        type: String,
        minimum: 4,
        default: 'JohnDoe',
    })
    displayname: string;

    @IsNotEmpty()
    @Min(1)
    @ApiProperty({
        description: 'The first name for the user',
        type: String,
        minimum: 1,
        default: 'John',
    })
    firstname: string;

    @IsNotEmpty()
    @Min(1)
    @ApiProperty({
        description: 'The last name for the user',
        type: String,
        minimum: 1,
        default: 'Doe',
    })
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    @Min(4)
    @ApiProperty({
        description: 'The email for the user',
        type: String,
        minimum: 4,
        default: 'johndoe@minibook.io',
    })
    email: string;

    @IsNotEmpty()
    @Min(4)
    @ApiProperty({
        description: 'The email for the user',
        type: String,
        minimum: 4,
        default: '#@jMpXQ^%Sb8M3',
    })
    password: string;
}
