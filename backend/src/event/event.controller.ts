import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventExist } from 'src/guard/eventExist.guard';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(EventExist)
  @Post()
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Body() eventDto: EventDTO) {
    return this.eventService.create(eventDto);
  }
  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  async getAll() {
    return this.eventService.getAll();
  }
  @Get('/:id')
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'No Event found for the id' })
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getEventById(id);
  }
  @Get('name/:name')
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'No Event found for the id' })
  async getOneByName(@Param('name') name: string) {
    return this.eventService.findOneByName(name);
  }
  //TODO
  @Put()
  async update() {}

  @Delete('/:id')
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'No Event found for the id' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.eventService.delete(id);
  }
}
