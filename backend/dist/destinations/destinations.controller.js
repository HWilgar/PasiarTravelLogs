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
exports.DestinationsController = void 0;
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../exception-filter/http-exception.filter");
const destinations_service_1 = require("./destinations.service");
const create_destination_dto_1 = require("../dto/create-destination.dto");
const update_destination_dto_1 = require("../dto/update-destination.dto");
let DestinationsController = class DestinationsController {
    constructor(destinationsService) {
        this.destinationsService = destinationsService;
    }
    async findAll(response, tripId) {
        try {
            const destinations = await this.destinationsService.findAllDestination(tripId);
            response.status(200).json(destinations);
        }
        catch (error) {
            response.status(500).json({ error: 'Internal Server Error.' });
        }
    }
    async findOne(tripId, id, response) {
        try {
            const getDestinationById = await this.destinationsService.findOneDestination(id, tripId);
            response.status(200).json(getDestinationById);
        }
        catch (error) {
            throw new common_1.HttpException('Destination does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async create(createDestinationDto, request, response, tripId) {
        try {
            const createDestination = await this.destinationsService.createDestination(tripId, createDestinationDto);
            response.status(201).json(createDestination);
        }
        catch (error) {
            throw new common_1.HttpException('Destination already exists.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(response, id, tripId, updateDestinationDto) {
        try {
            const updatedDestination = await this.destinationsService.updateDestination(id, tripId, updateDestinationDto);
            response.status(201).json(updatedDestination);
        }
        catch (error) {
            throw new common_1.HttpException('Destination does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(response, id) {
        try {
            const deletedTrip = await this.destinationsService.deleteDestination(id);
            response.status(200).json(deletedTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Destination does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.DestinationsController = DestinationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('tripId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_destination_dto_1.CreateDestinationDto,
        Request, Object, String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tripId')),
    __param(3, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, update_destination_dto_1.UpdateDestinationDto]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "delete", null);
exports.DestinationsController = DestinationsController = __decorate([
    (0, common_1.Controller)('trips/:tripId/destinations'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [destinations_service_1.DestinationsService])
], DestinationsController);
//# sourceMappingURL=destinations.controller.js.map