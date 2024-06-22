import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../role.enum';

@Injectable()
export class GuardGuard implements CanActivate {


  constructor(private readonly reflector:Reflector ){}


  canActivate(context: ExecutionContext): boolean {

    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
        context.getHandler(), 
        context.getClass()
      ]);


    if (!roles) {
      return true;
    }

    const {user} = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) {
      return true;
    }

    if (roles === user.role) {
        return true;
    }else {
      throw new UnauthorizedException();
    }

  }
}