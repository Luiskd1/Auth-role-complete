import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypts';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private prisma:PrismaService,
    private jwtService: JwtService
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    
    try {
     const passwordHash = encodePassword(createAuthDto.password);
     await this.prisma.registerModel.create({ data: {...createAuthDto, password:passwordHash} })
     return "user created successfully!  "
    } catch (error) {
      throw new NotFoundException("dont create a new user");
    }
  }


  async loginUser(loginAuthDto:LoginAuthDto){
    const user = await this.prisma.registerModel.findUnique({ where: { email: loginAuthDto.email } });
    if (!user) { return new HttpException("User not found", 404); } 

    const checkPassword = await comparePasswords(loginAuthDto.password, user.password);

    if (!checkPassword) { return new HttpException("Invalid credentials", 401); }

    const token = await this.jwtService.sign({ userId: user.id, email: user.email, role: user.role });

    const { password, ...userWithoutPassword } = user;

    const data = {
      user: userWithoutPassword,
      token
    };

    return data
 

  }



  findAll({email, rol }:{email:string, rol:string}) {

    // if (rol !== "admin") {
    //     throw new UnauthorizedException(
    //       'You  are not authorized to acces this resource.'
    //     );
    // }
    

    return  this.prisma.registerModel.findUnique({ where: { email: email }, select:{createAt:true, email:true, id:true, role:true, updateAt:true, username:true } });;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
