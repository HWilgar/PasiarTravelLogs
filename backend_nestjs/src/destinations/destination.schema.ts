import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DestinationDocument = HydratedDocument<Destination>;

@Schema()
export class Destination {
  @Prop()
  name: string;

  @Prop()
  location: Array<number>;

  @Prop()
  visited: boolean;

  @Prop()
  activities: Array<string>;

  @Prop()
  tripId: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
