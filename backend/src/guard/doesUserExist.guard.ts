import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { UserAccountService } from 'src/user-account/user-account.service';
  import { Request } from 'express';
  
  @Injectable()
  export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UserAccountService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
  
    async validateRequest(request: Request) {
      const userExist = await this.userService.findOneByUsername(
        request.body.username
      );
      const userExist2 = await this.userService.findOneByUsername(
        request.body.username.toLowerCase()
      );
      if (userExist || userExist2) {
        throw new BadRequestException('This Username already exist');
      }
      return true;
    }
  }
  