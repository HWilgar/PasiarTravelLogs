import { Model } from 'mongoose';
import { Trip } from './trip.schema';
import { CreateTripDto } from 'src/dto/create-trip.dto';
import { UpdateTripDto } from 'src/dto/update-trip.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class TripsService {
    private tripModel;
    private cloudinary;
    constructor(tripModel: Model<Trip>, cloudinary: CloudinaryService);
    findAllTrip(userId: string): Promise<Trip[]>;
    findOneTrip(id: string): Promise<Trip | null>;
    createTripUpload(createTripDto: CreateTripDto, userId: string, filename: string, path: string): Promise<Trip>;
    createTrip(createTripDto: CreateTripDto, userId: string): Promise<Trip>;
    updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<Trip | null>;
    updateTripImage(id: string, filename: string, path: string): Promise<Trip | null>;
    deleteTrip(id: string): Promise<number>;
}
