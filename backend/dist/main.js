"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const helmet_1 = require("helmet");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    dotenv.config();
    const adapter = new platform_express_1.ExpressAdapter();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.setGlobalPrefix('api/v1');
    app.use((0, helmet_1.default)());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map