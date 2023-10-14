import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ATStrategy, RTStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule,UserAccountModule, JwtModule.register({})],
  providers: [AuthService, RTStrategy, ATStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
