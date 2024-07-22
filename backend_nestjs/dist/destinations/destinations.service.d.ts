import { Destination } from './destination.schema';
import { Model } from 'mongoose';
import { CreateDestinationDto } from 'src/dto/create-destination.dto';
import { UpdateDestinationDto } from 'src/dto/update-destination.dto';
export declare class DestinationsService {
    private destinationModel;
    constructor(destinationModel: Model<Destination>);
    findAllDestination(tripId: string): Promise<Destination[]>;
    findOneDestination(id: string, tripId: string): Promise<Destination | null>;
    createDestination(tripId: string, createDestinationDto: CreateDestinationDto): Promise<Destination>;
    updateDestination(id: string, tripId: string, updateDestiationDto: UpdateDestinationDto): Promise<Destination | null>;
    deleteDestination(id: string): Promise<number>;
}
