import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserActiveInterface } from "../interface/user-active.interface";

export const ActiveUser = createParamDecorator (

    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
) 