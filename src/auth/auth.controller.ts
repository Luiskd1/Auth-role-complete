import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { AuthenticatedRequest, AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { GuardGuard } from './guard/roles.guard';
import { Role } from './role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }


  @Post("login")
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  // @Get()
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, GuardGuard)
  // findAll(@Req()req:AuthenticatedRequest ) {
  //   return this.authService.findAll(
  //     {
  //       email: req.user.email,
  //       rol: req.user.role
  //     }
  //   );
  // }

  @Get()
  @Auth(Role.ADMIN)
  findAll(@ActiveUser() req:UserActiveInterface) {
    return this.authService.findAll(
      {
        email: req.email,
        rol: req.role
      }
    );
  }

 
}
