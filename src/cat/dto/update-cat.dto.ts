import {
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class UpdateCatDto {
    @IsString()
    @MinLength(1)
    name?: string;
  
    @IsInt()
    @IsPositive()
    age?: number;
  
    @IsString()
    breed?: string;
  }