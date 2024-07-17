/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
