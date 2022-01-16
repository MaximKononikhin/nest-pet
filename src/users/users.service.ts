import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const role = await this.roleService.getRoleByValue("ADMIN");
        const user = await this.userRepository.save({...dto, roles: [role]});
        return user;
    }

    async getAllUsers()  {
        const users = await this.userRepository.find({relations: ['roles']});
        return users;
    }

    async getUserByEmail(email: string) {
         const user = await this.userRepository.findOne({where: {email}, relations: ['roles']});
         return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}, relations: ['roles']});
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await this.userRepository.save({...user, roles: [...user.roles, role]});
            return dto;
        }
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}});
        if (user) {
            user.banned = true;
            user.banReason = dto.banReason
            await this.userRepository.save(user);
            return user;
        }
        throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
}
