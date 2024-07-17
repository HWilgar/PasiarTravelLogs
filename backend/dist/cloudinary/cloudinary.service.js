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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
    }
    async uploadImage(filePath) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(filePath, { folder: 'travel-logs' }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Upload result is undefined'));
                resolve(result);
            });
        });
    }
    async deleteImage(public_id) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(`travel-logs/${public_id}`, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Upload result is undefined'));
                resolve(result);
            });
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map