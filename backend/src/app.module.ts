import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { DestinationsModule } from './destinations/destinations.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://hwgcarino:mmtyyCvypus1wqyd@cluster0.rmcbljq.mongodb.net/map',
      {
        connectionFactory: (connection) => {
          connection.set('useNewUrlParser', true);
          connection.set('useUnifiedTopology', true);
          return connection;
        },
      },
    ),
    UsersModule,
    AuthModule,
    TripsModule,
    DestinationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
