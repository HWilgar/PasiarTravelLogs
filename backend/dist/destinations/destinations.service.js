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
exports.DestinationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const destination_schema_1 = require("./destination.schema");
const mongoose_2 = require("mongoose");
let DestinationsService = class DestinationsService {
    destinationModel;
    constructor(destinationModel) {
        this.destinationModel = destinationModel;
    }
    async findAllDestination(tripId) {
        return this.destinationModel.find({ tripId: tripId }).exec();
    }
    async findOneDestination(id, tripId) {
        return this.destinationModel
            .findOne({ $and: [{ _id: id }, { tripId: tripId }] })
            .exec();
    }
    async createDestination(tripId, createDestinationDto) {
        const createDestination = new this.destinationModel({
            ...createDestinationDto,
            tripId: tripId,
        });
        return createDestination.save();
    }
    async updateDestination(id, tripId, updateDestiationDto) {
        const updatedDestination = await this.destinationModel.findByIdAndUpdate(id, updateDestiationDto, { new: true });
        return updatedDestination;
    }
    async deleteDestination(id) {
        const { deletedCount } = await this.destinationModel.deleteOne({ _id: id });
        return deletedCount;
    }
};
exports.DestinationsService = DestinationsService;
exports.DestinationsService = DestinationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(destination_schema_1.Destination.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DestinationsService);
//# sourceMappingURL=destinations.service.js.map