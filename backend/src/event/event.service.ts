import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventDTO } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly primsa: PrismaService) {}
  async getEventById(id: number) {
    const event = await this.primsa.event.findUnique({
      where: { id },
      include: {
        tickets: true,
      },
    });

    if (!event) throw new BadRequestException('No Event Exist with id ' + id);
    return event;
  }
  async findOneByName(name: string) {
    return await this.primsa.event.findUnique({
      where: { name },
      include: {
        tickets: true,
      },
    });
  }

  async delete(id: number) {
    return await this.primsa.event.delete({
      where: {
        id,
      },
    });
  }

  async create(eventDto: EventDTO) {
    return await this.primsa.event.create({
      data: eventDto,
    });
  }

  async getAll() {
    return await this.primsa.event.findMany({
      include: {
        createdBy: true,
      },
    });
  }
}
