import { CreateTripDto } from './create-trip.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTripDto extends PartialType(CreateTripDto) {}
