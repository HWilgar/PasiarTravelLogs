import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';
import { TripsService } from './trips.service';
import { Response } from 'express';
import { CreateTripDto } from 'src/dto/create-trip.dto';
import { UpdateTripDto } from 'src/dto/update-trip.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorator/public.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('trips')
@UseFilters(HttpExceptionFilter)
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(@Res() response: Response, @Req() request: any) {
    try {
      const userId = request.user.sub;
      const trips = await this.tripsService.findAllTrip(userId);
      response.status(200).json(trips);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const getTripById = await this.tripsService.findOneTrip(id);
      response.status(200).json(getTripById);
    } catch (error) {
      throw new HttpException('Trip does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async createUpload(
    @Body(ValidationPipe) createTripDto: CreateTripDto,
    @Req() request: any,
    @Res() response: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg|png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const result = await this.cloudinaryService.uploadImage(file.path);
      const filename = result.public_id.split('/')[1];
      const path = result.url;
      const userId = request.user.sub;

      const createTrip = await this.tripsService.createTripUpload(
        createTripDto,
        userId,
        filename,
        path,
      );
      response.status(201).json(createTrip);
    } catch (error) {
      throw new HttpException('Trip already exists.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(
    @Body(ValidationPipe) createTripDto: CreateTripDto,
    @Req() request: any,
    @Res() response: Response,
  ) {
    try {
      const userId = request.user.sub;
      const createTrip = await this.tripsService.createTrip(
        createTripDto,
        userId,
      );
      response.status(201).json(createTrip);
    } catch (error) {
      throw new HttpException('Trip already exists.', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body(ValidationPipe) updateTripDto: UpdateTripDto,
  ) {
    try {
      const updatedTrip = await this.tripsService.updateTrip(id, updateTripDto);
      response.status(201).json(updatedTrip);
    } catch (error) {
      throw new HttpException('Trip does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Res() response: Response,
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg|png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const prevImage = await this.tripsService.findOneTrip(id);
      if (prevImage?.image?.filename) {
        const deleted = await this.cloudinaryService.deleteImage(
          prevImage?.image?.filename,
        );

        if (deleted) {
          const result = await this.cloudinaryService.uploadImage(file.path);
          const filename = result.public_id.split('/')[1];
          const path = result.url;

          const updatedTrip = await this.tripsService.updateTripImage(
            id,
            filename,
            path,
          );
          response.status(201).json(updatedTrip);
        }
      } else {
        const result = await this.cloudinaryService.uploadImage(file.path);
        const filename = result.public_id.split('/')[1];
        const path = result.url;

        const updatedTrip = await this.tripsService.updateTripImage(
          id,
          filename,
          path,
        );
        response.status(201).json(updatedTrip);
      }
    } catch (error) {
      throw new HttpException('Trip does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Public()
  @Put(':id/del')
  async softDelete(@Res() response: Response, @Param('id') id: string) {
    try {
      const updatedTrip = await this.tripsService.updateTrip(id, {
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      });

      if (updatedTrip?.image?.filename) {
        await this.cloudinaryService.deleteImage(updatedTrip?.image?.filename);
      }
      response.status(201).json(updatedTrip);
    } catch (error) {
      throw new HttpException('Trip does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    try {
      const deletedTrip = await this.tripsService.deleteTrip(id);
      response.status(200).json(deletedTrip);
    } catch (error) {
      throw new HttpException('Trip does not exist.', HttpStatus.NOT_FOUND);
    }
  }
}
