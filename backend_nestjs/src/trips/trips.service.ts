import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './trip.schema';
import { CreateTripDto } from 'src/dto/create-trip.dto';
import { UpdateTripDto } from 'src/dto/update-trip.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<Trip>,
    private cloudinary: CloudinaryService,
  ) {}

  async findAllTrip(userId: string): Promise<Trip[]> {
    return this.tripModel
      .find({ $and: [{ userId }, { is_deleted: { $nin: true } }] })
      .exec();
  }

  async findOneTrip(id: string): Promise<Trip | null> {
    return this.tripModel.findOne({ _id: id }).exec();
  }

  async createTripUpload(
    createTripDto: CreateTripDto,
    userId: string,
    filename: string,
    path: string,
  ): Promise<Trip> {
    const createdTrip = new this.tripModel({
      userId,
      ...createTripDto,
      image: { filename: filename, path: path },
    });
    return createdTrip.save();
  }

  async createTrip(
    createTripDto: CreateTripDto,
    userId: string,
  ): Promise<Trip> {
    const createdTrip = new this.tripModel({
      userId,
      ...createTripDto,
    });
    return createdTrip.save();
  }

  async updateTrip(
    id: string,
    updateTripDto: UpdateTripDto,
  ): Promise<Trip | null> {
    const updatedTrip = await this.tripModel.findByIdAndUpdate(
      id,
      updateTripDto,
      { new: true },
    );
    return updatedTrip;
  }

  async updateTripImage(
    id: string,
    filename: string,
    path: string,
  ): Promise<Trip | null> {
    await this.tripModel.updateOne(
      { _id: id },
      { $set: { image: { filename: filename, path: path } } },
    );
    const updatedTrip = await this.tripModel.findById(id);
    return updatedTrip;
  }

  async deleteTrip(id: string): Promise<number> {
    const { deletedCount } = await this.tripModel.deleteOne({ _id: id }).exec();
    return deletedCount;
  }
}
