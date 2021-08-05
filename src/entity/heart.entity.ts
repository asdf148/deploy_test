import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Writing } from "./writing.entity";
import { User } from "./user.entity";

@Entity()
export class Heart{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @ManyToOne(
        () => User,
        (user) => user.hearts
    )
    @ApiProperty({ description: '유저 아이디'})
    user: User;
    
    @ManyToOne(
        () => Writing,
        (post) => post.hearts
    )
    @ApiProperty({ description: '모집글 아이디'})
    writing: Writing;
} 