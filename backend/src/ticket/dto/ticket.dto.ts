import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';


export class TicketDTO {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly price: number;
    @IsNotEmpty()
    readonly eventId: number;
  }