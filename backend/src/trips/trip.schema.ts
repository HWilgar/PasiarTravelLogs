import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';

export type TripDocument = HydratedDocument<User>;
export type Image = { filename: string; path: string };

@Schema({ timestamps: true })
export class Trip {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  name: string;

  @Prop()
  date: string;

  @Prop({ type: Object })
  image: Image;

  @Prop()
  is_deleted: boolean;

  @Prop()
  deleted_at: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
