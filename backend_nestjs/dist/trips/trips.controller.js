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
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../exception-filter/http-exception.filter");
const trips_service_1 = require("./trips.service");
const create_trip_dto_1 = require("../dto/create-trip.dto");
const update_trip_dto_1 = require("../dto/update-trip.dto");
const platform_express_1 = require("@nestjs/platform-express");
const public_decorator_1 = require("../auth/decorator/public.decorator");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let TripsController = class TripsController {
    constructor(tripsService, cloudinaryService) {
        this.tripsService = tripsService;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll(response, request) {
        try {
            const userId = request.user.sub;
            const trips = await this.tripsService.findAllTrip(userId);
            response.status(200).json(trips);
        }
        catch (error) {
            response.status(500).json({ error: 'Internal Server Error.' });
        }
    }
    async findOne(response, id) {
        try {
            const getTripById = await this.tripsService.findOneTrip(id);
            response.status(200).json(getTripById);
        }
        catch (error) {
            throw new common_1.HttpException('Trip does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createUpload(createTripDto, request, response, file) {
        try {
            const result = await this.cloudinaryService.uploadImage(file.path);
            const filename = result.public_id.split('/')[1];
            const path = result.url;
            const userId = request.user.sub;
            const createTrip = await this.tripsService.createTripUpload(createTripDto, userId, filename, path);
            response.status(201).json(createTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Trip already exists.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(createTripDto, request, response) {
        try {
            const userId = request.user.sub;
            const createTrip = await this.tripsService.createTrip(createTripDto, userId);
            response.status(201).json(createTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Trip already exists.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(response, id, updateTripDto) {
        try {
            const updatedTrip = await this.tripsService.updateTrip(id, updateTripDto);
            response.status(201).json(updatedTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Trip does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateImage(response, id, file) {
        try {
            const prevImage = await this.tripsService.findOneTrip(id);
            if (prevImage?.image?.filename) {
                const deleted = await this.cloudinaryService.deleteImage(prevImage?.image?.filename);
                if (deleted) {
                    const result = await this.cloudinaryService.uploadImage(file.path);
                    const filename = result.public_id.split('/')[1];
                    const path = result.url;
                    const updatedTrip = await this.tripsService.updateTripImage(id, filename, path);
                    response.status(201).json(updatedTrip);
                }
            }
            else {
                const result = await this.cloudinaryService.uploadImage(file.path);
                const filename = result.public_id.split('/')[1];
                const path = result.url;
                const updatedTrip = await this.tripsService.updateTripImage(id, filename, path);
                response.status(201).json(updatedTrip);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Trip does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async softDelete(response, id) {
        try {
            const updatedTrip = await this.tripsService.updateTrip(id, {
                is_deleted: true,
                deleted_at: new Date().toISOString(),
            });
            if (updatedTrip?.image?.filename) {
                await this.cloudinaryService.deleteImage(updatedTrip?.image?.filename);
            }
            response.status(201).json(updatedTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Trip does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(response, id) {
        try {
            const deletedTrip = await this.tripsService.deleteTrip(id);
            response.status(200).json(deletedTrip);
        }
        catch (error) {
            throw new common_1.HttpException('Trip does not exist.', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.TripsController = TripsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.FileTypeValidator({ fileType: 'image/jpeg|png' })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "createUpload", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_trip_dto_1.UpdateTripDto]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.FileTypeValidator({ fileType: 'image/jpeg|png' })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "updateImage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id/del'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "delete", null);
exports.TripsController = TripsController = __decorate([
    (0, common_1.Controller)('trips'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [trips_service_1.TripsService,
        cloudinary_service_1.CloudinaryService])
], TripsController);
//# sourceMappingURL=trips.controller.js.map