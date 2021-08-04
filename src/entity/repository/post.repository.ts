import {EntityRepository, Repository} from "typeorm";
import { Post } from "../post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

    findByTitle(title:string) {
        return this.createQueryBuilder("post")
            .where("user.title = :title", { title })
            .getMany();
    }
}