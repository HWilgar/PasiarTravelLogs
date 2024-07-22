import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';
export type TripDocument = HydratedDocument<User>;
export type Image = {
    filename: string;
    path: string;
};
export declare class Trip {
    userId: User;
    name: string;
    date: string;
    image: Image;
    is_deleted: boolean;
    deleted_at: string;
}
export declare const TripSchema: mongoose.Schema<Trip, mongoose.Model<Trip, any, any, any, mongoose.Document<unknown, any, Trip> & Trip & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Trip, mongoose.Document<unknown, {}, mongoose.FlatRecord<Trip>> & mongoose.FlatRecord<Trip> & {
    _id: mongoose.Types.ObjectId;
}>;
