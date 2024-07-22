"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationsModule = void 0;
const common_1 = require("@nestjs/common");
const destinations_controller_1 = require("./destinations.controller");
const destinations_service_1 = require("./destinations.service");
const mongoose_1 = require("@nestjs/mongoose");
const destination_schema_1 = require("./destination.schema");
let DestinationsModule = class DestinationsModule {
};
exports.DestinationsModule = DestinationsModule;
exports.DestinationsModule = DestinationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: destination_schema_1.Destination.name, schema: destination_schema_1.DestinationSchema },
            ]),
        ],
        controllers: [destinations_controller_1.DestinationsController],
        providers: [destinations_service_1.DestinationsService],
    })
], DestinationsModule);
//# sourceMappingURL=destinations.module.js.map