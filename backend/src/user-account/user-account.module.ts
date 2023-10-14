import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[JwtModule.register({})],
    providers:[UserAccountService,],
    exports:[UserAccountService],
    controllers:[UserAccountController]

})
export class UserAccountModule {}
