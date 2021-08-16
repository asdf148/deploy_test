import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'jsonwebtoken';
import { Application } from 'src/entity/application.entity';
import { CreateApplication } from 'src/entity/application_dto/createApplication.dto';
import { ApplicationRepository } from 'src/entity/repository/application.repository';
import { UserRepository } from 'src/entity/repository/user.repository';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(ApplicationRepository) private applicationRepository:ApplicationRepository,
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        @InjectRepository(WritingRepository) private writingRepository:WritingRepository
    ) {}

    async create(token:string, post_id:string, createApplication:CreateApplication):Promise<Application|string>{
        const application:Application = new Application();
        const user:any = verify(token.substring(7,),process.env.secretKey);

        if(typeof user == "string"){
            return "token error";
        }

        application.name = createApplication.name;
        application.phone_number = createApplication.phone_number;
        application.sentence = createApplication.sentence;
        application.user = await this.userRepository.findOne(user.user_id);
        application.writing = await this.writingRepository.findOne(post_id);

        return this.applicationRepository.save(application);
    }

    async delete(id:string):Promise<DeleteResult>{
        return this.applicationRepository.delete(id);
    }

    //에러 writingId
    async findAll(post_id:string):Promise<Application[]>{
        return this.applicationRepository.find({where:{writingId:post_id}});
    }

    async statusChange(id:string, status:string):Promise<UpdateResult>{
        const application:Application = await this.applicationRepository.findOne(id);

        application.accep_status = status;

        return this.applicationRepository.update(id, application);
    }
}
