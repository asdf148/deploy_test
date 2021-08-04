import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Application{

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

    @Column()
    @ApiProperty({ description: '이름'})
    name: string;

    @Column()
    @ApiProperty({ description: '전화번호'})
    phone_number: number;

    @Column()
    @ApiProperty({ description: '각오 한 마디'})
    sentence: string;

    @Column({
        default: "wait"
    })
    @ApiProperty({ description: '수락 여부'})
    accep_status: string;
} 