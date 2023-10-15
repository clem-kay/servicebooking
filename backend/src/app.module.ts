import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserAccountService } from './user-account/user-account.service';
import { UserAccountController } from './user-account/user-account.controller';
import { UserAccountModule } from './user-account/user-account.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserAccountModule,
    AuthModule,
    PrismaModule,
    EventModule,
    TicketModule
  ],
  controllers: [AppController, EventController],
  providers: [AppService, PrismaService, EventService],
})
export class AppModule {}
