import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<number>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
}
