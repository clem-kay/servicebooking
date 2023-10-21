import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDTO } from './dto/ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly primsa: PrismaService) {}
  async getTicketById(id: number) {
    const event = await this.primsa.ticket.findUnique({
      where: { id },
    });

    if (!event) throw new BadRequestException('No ticket Exist with id ' + id);
    return event;
  }
  async findOneByName(name: string) {
    return await this.primsa.ticket.findMany({
      where: { name },
    });
  }

  async delete(id: number) {
    return await this.primsa.ticket.delete({
      where: {
        id,
      },
    });
  }

  async create(ticket: TicketDTO) {
    return await this.primsa.ticket.create({
      data: ticket,
    });
  }

  async getAll(eventId: number) {
    return await this.primsa.ticket.findMany({
      where: {
        eventId,
      },
    });
  }
}
