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
  import { AuthGuard } from '@nestjs/passport';
  import { EventExist } from 'src/guard/eventExist.guard';
  import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { TicketDTO } from './dto/ticket.dto';
  
  @Controller('ticket')
  export class TicketController {
    constructor(private readonly ticketService: TicketService) {}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    async create(@Body() ticketDto: TicketDTO) {
      return this.ticketService.create(ticketDto);
    }
    @Get('/event/:id')
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    async getAllByEventId(@Param('id', ParseIntPipe) id: number) {
      return this.ticketService.getAll(id);
    }
    
    @Get('/:id')
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @ApiNotFoundResponse({ description: 'No Event found for the id' })
    async getEventById(@Param('id', ParseIntPipe) id: number) {
      return this.ticketService.getTicketById(id);
    }
    @Get('name/:name')
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @ApiNotFoundResponse({ description: 'No Event found for the id' })
    async getOneByName(@Param('name') name: string) {
      return this.ticketService.findOneByName(name);
    }
    //TODO
    @Put()
    async update() {}
  
    @Delete('/:id')
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @ApiNotFoundResponse({ description: 'No Event found for the id' })
    async delete(@Param('id', ParseIntPipe) id: number) {
      this.ticketService.delete(id);
    }
  }