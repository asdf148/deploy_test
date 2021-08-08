import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'jsonwebtoken';
import { Comment } from 'src/entity/comment.entity';
import { CreateComment } from 'src/entity/comment_dto/createComment.dto';
import { UpdateComment } from 'src/entity/comment_dto/updateComment.dto';
import { CommentRepository } from 'src/entity/repository/comment.repository';
import { UserRepository } from 'src/entity/repository/user.repository';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository) private commentRepository:CommentRepository,
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        @InjectRepository(WritingRepository) private writingRepository:WritingRepository
    ) {}

    async findAll(post_id:string):Promise<Comment[]>{
        return this.commentRepository.find({where:{writingId:post_id}});
    }

    async create(token:string, post_id:string, createComment:CreateComment):Promise<Comment|string>{
        const comment = new Comment();
        const user:any = verify(token.substring(7,),process.env.secretKey);

        if(typeof user == "string"){
            return "Token error";
        }

        comment.content = createComment.content;
        comment.user = await this.userRepository.findOne(user.user_id);
        comment.writing = await this.writingRepository.findOne(post_id);

        return await this.commentRepository.save(comment);
    }

    async update(id:string, updateComment:UpdateComment):Promise<UpdateResult>{
        const comment:Comment = await this.commentRepository.findOne(id);

        comment.content = updateComment.content;

        return await this.commentRepository.update(id, comment);
    }

    async delete(id:string):Promise<DeleteResult>{
        return this.commentRepository.delete(id);
    }
}
