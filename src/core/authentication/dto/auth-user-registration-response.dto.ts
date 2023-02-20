import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min, IsEmail } from "class-validator";

export class AuthUserRegistrationResponse {
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
    @Min(1)
    @ApiProperty({
        description: 'The email for the user',
        type: Number,
    })
    userId: number;
}
