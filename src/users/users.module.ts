import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Role} from "../roles/roles.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.entity";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      TypeOrmModule.forFeature([User, Role, Post]),
      RolesModule,
      forwardRef(() => AuthModule)
    ],
    exports: [UsersService]
})
export class UsersModule {}
