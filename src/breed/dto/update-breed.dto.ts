import { PartialType } from '@nestjs/swagger';
import { CreateBreedDto } from './create-breed.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {

    @MinLength(3)
    @IsString()
    name?: string;
}
