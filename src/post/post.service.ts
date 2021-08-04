import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { PostRepository } from 'src/entity/repository/post.repository';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostRepository) private postRepository: Repository<Post>, ) {}

    async findAll():Promise<Post[]>{
        return this.postRepository.find();
    }
}
