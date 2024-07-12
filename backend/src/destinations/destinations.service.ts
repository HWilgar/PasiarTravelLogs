import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Destination } from './destination.schema';
import { Model } from 'mongoose';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
  ) {}

  async findAllDestination(tripId: string): Promise<Destination[]> {
    return this.destinationModel.find({ tripId: tripId }).exec();
  }

  async findOneDestination(
    id: string,
    tripId: string,
  ): Promise<Destination | null> {
    return this.destinationModel
      .findOne({ $and: [{ _id: id }, { tripId: tripId }] })
      .exec();
  }

  async createDestination(
    tripId: string,
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    const createDestination = new this.destinationModel({
      ...createDestinationDto,
      tripId: tripId,
    });
    return createDestination.save();
  }

  async updateDestination(
    id: string,
    tripId: string,
    updateDestiationDto: UpdateDestinationDto,
  ): Promise<Destination | null> {
    const updatedDestination = await this.destinationModel.findByIdAndUpdate(
      id,
      updateDestiationDto,
      { new: true },
    );
    return updatedDestination;
  }

  async deleteDestination(id: string): Promise<number> {
    const { deletedCount } = await this.destinationModel.deleteOne({ _id: id });
    return deletedCount;
  }
}
