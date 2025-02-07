import {
    IsInt,
    IsPositive,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreateCatDto {
    @IsString()
    @MinLength(1)
    name: string;
  
    @IsInt()
    @IsPositive()
    age: number;
  
    @IsString()
    @MinLength(1)
    breed: string;
  }