"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_schema_1 = require("./trip.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let TripsService = class TripsService {
    constructor(tripModel, cloudinary) {
        this.tripModel = tripModel;
        this.cloudinary = cloudinary;
    }
    async findAllTrip(userId) {
        return this.tripModel
            .find({ $and: [{ userId }, { is_deleted: { $nin: true } }] })
            .exec();
    }
    async findOneTrip(id) {
        return this.tripModel.findOne({ _id: id }).exec();
    }
    async createTripUpload(createTripDto, userId, filename, path) {
        const createdTrip = new this.tripModel({
            userId,
            ...createTripDto,
            image: { filename: filename, path: path },
        });
        return createdTrip.save();
    }
    async createTrip(createTripDto, userId) {
        const createdTrip = new this.tripModel({
            userId,
            ...createTripDto,
        });
        return createdTrip.save();
    }
    async updateTrip(id, updateTripDto) {
        const updatedTrip = await this.tripModel.findByIdAndUpdate(id, updateTripDto, { new: true });
        return updatedTrip;
    }
    async updateTripImage(id, filename, path) {
        await this.tripModel.updateOne({ _id: id }, { $set: { image: { filename: filename, path: path } } });
        const updatedTrip = await this.tripModel.findById(id);
        return updatedTrip;
    }
    async deleteTrip(id) {
        const { deletedCount } = await this.tripModel.deleteOne({ _id: id }).exec();
        return deletedCount;
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], TripsService);
//# sourceMappingURL=trips.service.js.map