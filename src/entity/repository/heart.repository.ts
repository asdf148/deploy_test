import { Injectable } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Heart } from "../heart.entity";

@Injectable()
@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {

}