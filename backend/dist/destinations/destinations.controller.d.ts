/// <reference types="node" />
import { DestinationsService } from './destinations.service';
import { Response } from 'express';
import { CreateDestinationDto } from 'src/dto/create-destination.dto';
import { UpdateDestinationDto } from 'src/dto/update-destination.dto';
export declare class DestinationsController {
    private readonly destinationsService;
    constructor(destinationsService: DestinationsService);
    findAll(response: Response, tripId: string): Promise<void>;
    findOne(tripId: string, id: string, response: Response): Promise<void>;
    create(createDestinationDto: CreateDestinationDto, request: Request, response: Response, tripId: string): Promise<void>;
    update(response: Response, id: string, tripId: string, updateDestinationDto: UpdateDestinationDto): Promise<void>;
    delete(response: Response, id: string): Promise<void>;
}
