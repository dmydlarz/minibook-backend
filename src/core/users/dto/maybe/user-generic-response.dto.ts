import { IsNotEmpty, IsEmail, IsUrl } from "class-validator";

export class UserGenericResponse {
    @IsNotEmpty()
    id?: number;

    @IsNotEmpty()
    displayname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsUrl()
    avatar?: string;

    firstname: string;

    lastname: string

    posts?: any[]

    friends?: any[]
}
