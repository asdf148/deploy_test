import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Application } from "./application.entity";
import { Heart } from "./heart.entity";
import { Post } from "./post.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    @ApiProperty({description: '아이디'})
    id: number;

    @Column()
    @ApiProperty({ description: '닉네임'})
    nick: string;

    @Column()
    @ApiProperty({ description: '이메일'})
    email: string;

    @Column()
    @ApiProperty({ description: '비밀번호'})
    password: string;

    @Column({
        nullable: true,
    })
    @ApiProperty({ description: '프로필 이미지 경로'})
    imagePath: string;

    @OneToMany(
        () => Post,
        (post)=>post.userId
    )
    post: Post[];

    @OneToMany(
        () => Heart,
        (heart)=>heart.userId
    )
    heart: Heart[];

    @OneToMany(
        () => Application,
        (application)=>application.userId
    )
    application: Heart[];
}