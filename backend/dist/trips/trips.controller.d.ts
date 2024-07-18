import { TripsService } from './trips.service';
import { Response } from 'express';
import { CreateTripDto } from 'src/dto/create-trip.dto';
import { UpdateTripDto } from 'src/dto/update-trip.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class TripsController {
    private readonly tripsService;
    private readonly cloudinaryService;
    constructor(tripsService: TripsService, cloudinaryService: CloudinaryService);
    findAll(response: Response, request: any): Promise<void>;
    findOne(response: Response, id: string): Promise<void>;
    createUpload(createTripDto: CreateTripDto, request: any, response: Response, file: Express.Multer.File): Promise<void>;
    create(createTripDto: CreateTripDto, request: any, response: Response): Promise<void>;
    update(response: Response, id: string, updateTripDto: UpdateTripDto): Promise<void>;
    updateImage(response: Response, id: string, file: Express.Multer.File): Promise<void>;
    softDelete(response: Response, id: string): Promise<void>;
    delete(response: Response, id: string): Promise<void>;
}
