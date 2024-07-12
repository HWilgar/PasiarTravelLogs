import { IsNotEmpty, IsString } from 'class-validator';
import { Image } from 'src/trips/trip.schema';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  date: string;

  image: Image;

  UserId: string;

  is_deleted: boolean;

  deleted_at: string;
}
