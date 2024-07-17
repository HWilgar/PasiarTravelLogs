"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const helmet_1 = require("helmet");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: 'https://pasiar-travel-planner.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    };
    app.enableCors(corsOptions);
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api/v1');
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map