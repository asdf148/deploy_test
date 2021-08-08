import { Injectable } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Comment } from "../comment.entity";

@Injectable()
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

}