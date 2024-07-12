import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
  UseFilters,
  Param,
  ValidationPipe,
  Post,
  Body,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';
import { DestinationsService } from './destinations.service';
import { Response } from 'express';
import { CreateDestinationDto } from 'src/dto/create-destination.dto';
import { UpdateDestinationDto } from 'src/dto/update-destination.dto';

@Controller('trips/:tripId/destinations')
@UseFilters(HttpExceptionFilter)
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  async findAll(@Res() response: Response, @Param('tripId') tripId: string) {
    try {
      const destinations =
        await this.destinationsService.findAllDestination(tripId);
      response.status(200).json(destinations);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  @Get(':id')
  async findOne(
    @Param('tripId') tripId: string,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const getDestinationById =
        await this.destinationsService.findOneDestination(id, tripId);
      response.status(200).json(getDestinationById);
    } catch (error) {
      throw new HttpException(
        'Destination does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async create(
    @Body(ValidationPipe) createDestinationDto: CreateDestinationDto,
    @Req() request: Request,
    @Res() response: Response,
    @Param('tripId') tripId: string,
  ) {
    try {
      const createDestination =
        await this.destinationsService.createDestination(
          tripId,
          createDestinationDto,
        );
      response.status(201).json(createDestination);
    } catch (error) {
      throw new HttpException(
        'Destination already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Param('tripId') tripId: string,
    @Body(ValidationPipe) updateDestinationDto: UpdateDestinationDto,
  ) {
    try {
      const updatedDestination =
        await this.destinationsService.updateDestination(
          id,
          tripId,
          updateDestinationDto,
        );
      response.status(201).json(updatedDestination);
    } catch (error) {
      throw new HttpException(
        'Destination does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    try {
      const deletedTrip = await this.destinationsService.deleteDestination(id);
      response.status(200).json(deletedTrip);
    } catch (error) {
      throw new HttpException(
        'Destination does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
