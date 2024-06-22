import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { Role } from 'src/auth/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PrismaService } from 'prisma.service';
import { Cat } from '@prisma/client';


@Injectable()
export class CatService {

  constructor(
    private prisma:PrismaService
  ){}

  
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breedEntity = await this.validateBreed(createCatDto.breed);

   const CatCreate = await this.prisma.cat.create({
      data: {
        name: createCatDto.name,
        age: createCatDto.age,
        breedName: breedEntity.name, // Usa el nombre de la raza obtenido
        breedId: breedEntity.id,  // Usa el id de la raza obtenida
        userId: user.userId,          // Asegúrate de que user tiene una propiedad 'id'
        userEmail: user.email,    // Asigna el correo electrónico del usuario
      },
    });
    return CatCreate
  }

  async findAll(user: UserActiveInterface) {

      if (user.role === Role.ADMIN) {
        return await this.prisma.cat.findMany();
      }

      return await this.prisma.cat.findMany({where:{userId: user.userId}});
  }

  async findOne(id: number, user: UserActiveInterface) {
    
    const cat = await this.prisma.cat.findUnique({ where:{id} });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {

    let breedEntity;
    if (updateCatDto.breed) {
      breedEntity = await this.validateBreed(updateCatDto.breed);
      if (!breedEntity) {
        throw new BadRequestException('Breed not found');
      }
    }

    return await this.prisma.cat.update( {where:{id}, data:
      {
        name:  updateCatDto.name,
        age:   updateCatDto.age,
        breedName: breedEntity ? breedEntity.name : undefined,
        userEmail: user.email,
        userId: user.userId,
  
    }
  })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user );
    return await this.prisma.cat.delete({ where:{id:id} })
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string) {
    console.log(breed)
    const breedEntity = await this.prisma.breed.findUnique({ where:{name: breed} } );
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }

    return breedEntity;
  }
 }