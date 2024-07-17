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
