import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  Req,
  UseFilters,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter.ts';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const users = await this.usersService.findAll();
      response.status(200).json(users);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const getUserById = await this.usersService.findOne(id);
      response.status(200).json(getUserById);
    } catch (error) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @Public()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const createUser = await this.usersService.create(createUserDto);
      response.status(200).json(createUser);
    } catch (error) {
      throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      response.status(201).json(updatedUser);
    } catch (error) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param(':id') id: string) {
    try {
      const deletedUser = await this.usersService.delete(id);
      response.status(200).json(deletedUser);
    } catch (error) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
  }
}
