import { HydratedDocument } from 'mongoose';
export type DestinationDocument = HydratedDocument<Destination>;
export declare class Destination {
    name: string;
    location: Array<number>;
    visited: boolean;
    activities: Array<string>;
    tripId: string;
}
export declare const DestinationSchema: import("mongoose").Schema<Destination, import("mongoose").Model<Destination, any, any, any, import("mongoose").Document<unknown, any, Destination> & Destination & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Destination, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Destination>> & import("mongoose").FlatRecord<Destination> & {
    _id: import("mongoose").Types.ObjectId;
}>;
