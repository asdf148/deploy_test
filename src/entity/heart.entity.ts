import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Heart{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @ManyToOne(
        () => User,
        (user) => user.id
    )
    @JoinColumn({
        name: 'user_id'
    })
    @ApiProperty({ description: '유저 아이디'})
    userId: User;
    
    @ManyToOne(
        () => Post,
        (post) => post.id
    )
    @JoinColumn({
        name: 'post_id'
    })
    @ApiProperty({ description: '모집글 아이디'})
    postId: Post;
} 