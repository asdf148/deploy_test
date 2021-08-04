import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @Column()
    @ApiProperty({ description: '내용'})
    content: string;

    @ManyToOne(
        () => User,
        (user) => user.id
    )
    @JoinColumn({ name: 'user_id'})
    @ApiProperty({ description: '유저 아이디'})
    userId: User;

    @ManyToOne(
        () => Post,
        (post) => post.id
    )
    @JoinColumn({ name: 'post_id'})
    @ApiProperty({ description: '모집글 아이디'})
    postId: Post;

    @CreateDateColumn()
    @ApiProperty({ description: '생성 일자'})
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '수정 일자'})
    updatedAt: Date;
} 