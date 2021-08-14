import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'jsonwebtoken';
import { Heart } from 'src/entity/heart.entity';
import { HeartRepository } from 'src/entity/repository/heart.repository';
import { UserRepository } from 'src/entity/repository/user.repository';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { User } from 'src/entity/user.entity';
import { Writing } from 'src/entity/writing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeartService {
    constructor(
        @InjectRepository(HeartRepository) private heartRepository: Repository<Heart>, 
        @InjectRepository(UserRepository) private userRepository: Repository<User>,
        @InjectRepository(WritingRepository) private writingRepository: Repository<Writing>,
    ) {}

    async create(token:string, writing_id:string):Promise<string>{
        const user:any = verify(String(token).substring(7,),process.env.secretKey);

        const heart = new Heart();

        if(typeof user != "string"){
            heart.user = await this.userRepository.findOne(user.user_id);
            heart.writing = await this.writingRepository.findOne(writing_id);
        }

        await this.heartRepository.save(heart);

        return "Heart Pressed";
    }

    async delete(id:string):Promise<string>{
        
        await this.heartRepository.delete(id);

        return "Heart Canceled";
    }
}
