import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(response: Response): Promise<void>;
    findOne(response: Response, id: string): Promise<void>;
    create(createUserDto: CreateUserDto, request: Request, response: Response): Promise<void>;
    update(response: Response, id: string, updateUserDto: UpdateUserDto): Promise<void>;
    delete(response: Response, id: string): Promise<void>;
}
