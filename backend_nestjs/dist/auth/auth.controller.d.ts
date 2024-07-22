import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
