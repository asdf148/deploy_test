import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/entity/repository/user.repository';
import { User } from 'src/entity/user.entity';
import { CreateUser } from 'src/entity/user_dto/createUser.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUser } from 'src/entity/user_dto/loginUser.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: Repository<User>, ) {}

    async create(createUser: CreateUser): Promise<User>{
        let user: User = new User();

        user.nick = createUser.nick;
        user.email = createUser.email;
        user.password = await bcrypt.hash(createUser.password, 12);

        return this.userRepository.save(user);
    }

    async findOne(id:string):Promise<User> {
        return this.userRepository.findOne(id);
    }

    async findOneAndRelation(id:string):Promise<User>{
        return this.userRepository.findOne({
            join: {
                alias: 'user',
                leftJoinAndSelect:{
                    writing: 'user.writings'
                }
            },
            where: { id : id }
        })
    }

    // async update(id:string, updateUser: UpdateUser):Promise<UpdateResult>{
    //     return this.userRepository.update(id, updateUser);
    // }

    // async delete(id:string):Promise<DeleteResult>{
    //     return this.userRepository.delete(id);
    // }

    async issueToken(loginUser:LoginUser): Promise<string>{

        let user:User = await this.userRepository.findOne({where: {email: loginUser.email}});

        if(!bcrypt.compare(loginUser.password, user.password)){
            return "Email or password is different.";
        }
        
        //만료시간 설정하는 법 알아오기
        return jwt.sign({user_id:user.id, user_email:user.email}, process.env.secretKey, {expiresIn: '10m', issuer: 'Server'})
    }
}
