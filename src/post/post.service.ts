import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from 'src/entity/writing.entity';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateWriting } from 'src/entity/writing_dto/updateWriting.dto';
import { CreateWriting } from 'src/entity/writing_dto/createWriting.dto';
import { verify } from 'jsonwebtoken';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/entity/repository/user.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(WritingRepository) private writingRepository: WritingRepository,
        @InjectRepository(UserRepository) private userRepository: Repository<User>,
    ) {}

    async findOne(id:string):Promise<Writing>{
        return this.writingRepository.findOne(id);
    }

    async findAll():Promise<Writing[]>{
        return this.writingRepository.findPosts();
    }

    async create(token:string, file:Express.Multer.File, createWriting:CreateWriting):Promise<Writing|string>{
        let writing:Writing = new Writing();
        const user:any = verify(String(token).substring(7),process.env.secretKey);


        if(typeof user == "string"){
            return "token error";
        }

        writing.title = createWriting.title;
        writing.content = createWriting.content;
        writing.personnel = createWriting.personnel;
        writing.period = createWriting.period;
        writing.category = createWriting.category;
        writing.user = await this.userRepository.findOne(user.user_id);

        return this.writingRepository.save(writing);
    }

    async update(id:string, updateWriting:UpdateWriting):Promise<UpdateResult>{
        let foundWritng = await this.writingRepository.findOne(id);

        if(typeof updateWriting.title != 'undefined'){
            foundWritng.title = updateWriting.title;
        }
        if(typeof updateWriting.content != 'undefined'){
            foundWritng.content = updateWriting.content;
        }
        if(typeof updateWriting.personnel != 'undefined'){
            foundWritng.personnel = updateWriting.personnel;
        }
        if(typeof updateWriting.period != 'undefined'){
            foundWritng.period = updateWriting.period;
        }
        if(typeof updateWriting.category != 'undefined'){
            foundWritng.category = updateWriting.category;
        }

        return this.writingRepository.update(id, foundWritng);
    }

    async delete(id:string):Promise<DeleteResult>{
        return this.writingRepository.delete(id);
    }
}
