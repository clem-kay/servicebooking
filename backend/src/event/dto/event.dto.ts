import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';


export class EventDTO {
 
        name: string;
        date: string;
        time: string;
        venue: string;
        description: string;
        eventImageURL: string;
        // You can include only the fields you want to expose in the DTO

}
