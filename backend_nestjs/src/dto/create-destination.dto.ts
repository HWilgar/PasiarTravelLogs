import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  location: Array<number>;

  activities: Array<string>;

  visited: boolean;

  tripId: string;
}
