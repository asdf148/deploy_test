import { Injectable } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Writing } from "../writing.entity";

@Injectable()
@EntityRepository(Writing)
export class WritingRepository extends Repository<Writing> {

    findByTitle(title:string) {
        return this.createQueryBuilder("writing")
            .where("writing.title = :title", { title })
            .getMany();
    }

    findPosts(){
        return this.createQueryBuilder("writing")
            .select(["title", "personnel", "period", "category"])
            .getMany();
    }
}