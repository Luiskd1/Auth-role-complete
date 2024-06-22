import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(2)
    username:string;
    @IsString()
    @MinLength(5)
    password:string;
    @IsString()
    @MinLength(5)
    @IsEmail()
    email:string;    
    
}

export class LoginAuthDto {

    @IsString()
    @MinLength(5)
    password:string;
    @IsString()
    @MinLength(5)
    @IsEmail()
    email:string;    
}