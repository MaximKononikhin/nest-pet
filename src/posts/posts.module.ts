import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {Post} from "./posts.entity";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
      TypeOrmModule.forFeature([User, Post]),
      FilesModule
  ]
})
export class PostsModule {}
