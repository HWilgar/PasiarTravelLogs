import { Image } from 'src/trips/trip.schema';
export declare class CreateTripDto {
    name: string;
    date: string;
    image: Image;
    UserId: string;
    is_deleted: boolean;
    deleted_at: string;
}
