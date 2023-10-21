import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/LoginDto';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);  
  constructor(private readonly authService: AuthService) {}

 
  @Post('login')
  @ApiOkResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async login(@Body() loginDto:LoginDto){
    const respose =  await this.authService.login(loginDto)
    return {
      message: 'Logged in successfully',
      data: respose
    };
  }
  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('/refresh')
  // refreshTokens(@Req() req: Request) {
  //   const user = req.user
  
  //   return this.authService.refreshTokens(user['sub'],user['refreshToken']);
  // }
}
