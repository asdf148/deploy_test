import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from 'src/entity/writing.entity';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateWriting } from 'src/entity/writing_dto/updateWriting.dto';
import { CreateWriting } from 'src/entity/writing_dto/createWriting.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(WritingRepository) private writingRepository: Repository<Writing>, ) {}

    async findAll():Promise<Writing[]>{
        return this.writingRepository.find();
    }

    async create(file:Express.Multer.File, createWriting:CreateWriting):Promise<Writing>{
        let writing:Writing = new Writing();

        writing.title = createWriting.title;
        writing.content = createWriting.content;
        writing.personnel = createWriting.personnel;
        writing.period = createWriting.period;
        writing.category = createWriting.category;

        return this.writingRepository.create(writing);
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
}
