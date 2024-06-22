import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { GuardGuard } from "../guard/roles.guard";
import { Role } from "../role.enum";



export function Auth(role:Role){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, GuardGuard)
    )
}