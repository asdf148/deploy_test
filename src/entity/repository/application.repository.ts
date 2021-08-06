import { Injectable } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Application } from "../application.entity";

@Injectable()
@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {

}