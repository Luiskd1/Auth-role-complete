import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class BreedService {

  constructor(
    private prisma:PrismaService
   ){}


  async create(createBreedDto: CreateBreedDto) {

    const breedfound = await this.prisma.breed.findUnique({where:{name: createBreedDto.name}})
    if (breedfound ) {
      throw new BadRequestException('Breed already exists');
    }
    const breed = await  this.prisma.breed.create({data: createBreedDto})
    return breed ;
  }

  findAll() {

    const breeds = this.prisma.breed.findMany();
    return breeds;
  }

  async findOne(id: number) {

    const breed = await this.prisma.breed.findUnique({where:{id}})
    if (!breed) {
      throw new HttpException(`Breed not found with id: ${id}`, 404);
    }
    return breed ;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {

    const breed = this.prisma.breed.update({where:{id}, data: updateBreedDto})
    if (!breed) {
      throw new HttpException(`Breed not found with id: ${id}`, 404);
    }

    return breed;
  }

  remove(id: number) {
    const breed = this.prisma.breed.delete({where:{id}})
    if (!breed) {
      throw new HttpException(`Breed not found with id: ${id}`, 404);
    }
    return breed;
  }
}
