import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { UserAccountService } from 'src/user-account/user-account.service';
  import { Request } from 'express';
import { EventService } from 'src/event/event.service';
  
  @Injectable()
  export class EventExist implements CanActivate {
    constructor(private readonly eventService: EventService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
  
    async validateRequest(request: Request) {
      const eventExist = await this.eventService.findOneByName(
        request.body.name
      );
      const eventExist2 = await this.eventService.findOneByName(
        request.body.name.toLowerCase()
      );
      if (eventExist || eventExist2) {
        throw new BadRequestException('This Event already exist');
      }
      return true;
    }
  }
  