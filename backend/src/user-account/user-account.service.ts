import { Injectable, Inject, Logger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/core/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAccountDTO } from './dto/user-account.dto';

@Injectable()
export class UserAccountService {
  
 
  private readonly logger = new Logger(UserAccountService.name);
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  
  async findOneById(id: number) {
    return await this.prisma.userAccount.findUnique({
      where: { id },
    });
  }

  async create(userAccount: UserAccountDTO) {
    return await this.prisma.userAccount.create({
      data: {
        ...userAccount,
        password: await hashPassword(userAccount.password),
      },
    });
  }

  async findOneByUsername(username: string) {
    return await this.prisma.userAccount.findUnique({
      where: { username },
    });
  }

  async getAll() {
    return await this.prisma.userAccount.findMany({
      select: { username: true, role: true,isActive:true },
    });
  }


  // async update(id: number, data: any) {
  //   const [numberOfAffectedRows, [updatedUser]] =
  //     await this.userAccountRepository.update(
  //       { ...data },
  //       { where: { id }, returning: true },
  //     );

  //   return { numberOfAffectedRows, updatedUser };
  // }

  // async delete(id: number) {
  //   return await this.userAccountRepository.destroy({ where: { id } });
  // }

  // async findById(id: number) {
  //   return await this.userAccountRepository.findOne({ where: { id } });
  // }

  // async updatePassword(id: number, password: string) {
  //   this.logger.log('updating password in the database');
  //   const newPassword = await hashPassword(password);
  //   return await this.userAccountRepository.update(
  //     { password: newPassword },
  //     { where: { id } },
  //   );
  // }

  async updateRTHash(id: number, rt: string) {
    const hash = await hashPassword(rt);
    await this.prisma.userAccount.update({
      where: { id },
      data: {
        hashedRT: hash,
      },
    });
  }
}
