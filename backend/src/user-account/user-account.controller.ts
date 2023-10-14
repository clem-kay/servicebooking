import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountDTO } from './dto/user-account.dto';
import { DoesUserExist } from 'src/guard/doesUserExist.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-account')
export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService) {}

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(DoesUserExist)
    @Post()
    async create(@Body() userAccountDTO:UserAccountDTO){
        this.userAccountService.create(userAccountDTO)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAccounts(){
        return this.userAccountService.getAll();

    }
}


