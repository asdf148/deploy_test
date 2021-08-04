import { Injectable } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { User } from "../user.entity";

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(name:string) {
        return this.createQueryBuilder("user")
            .where("user.name = :name", { name })
            .getMany();
    }

    findByEmail(email:string) {
        return this.createQueryBuilder("user")
            .where("user.email = :email", { email })
            .getOne();
    }
}