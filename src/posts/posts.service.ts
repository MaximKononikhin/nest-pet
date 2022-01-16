import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./posts.entity";
import {Repository} from "typeorm";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image) {
        const filename = await this.fileService.createFile(image);
        const post = await this.postRepository.save({...dto, image: filename});
        return post;
    }
}
