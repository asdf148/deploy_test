import {EntityRepository, Repository} from "typeorm";
import { Writing } from "../writing.entity";

@EntityRepository(Writing)
export class WritingRepository extends Repository<Writing> {

    findByTitle(title:string) {
        return this.createQueryBuilder("post")
            .where("post.title = :title", { title })
            .getMany();
    }
}