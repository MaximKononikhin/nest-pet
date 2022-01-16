import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        const token = await this.authService.login(dto);
        return token;
    }

    @Post('/registration')
    async registration(@Body() dto: CreateUserDto) {
        const token = await this.authService.registration(dto);
        return token;
    }
}
