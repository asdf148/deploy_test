import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Application } from "./application.entity";
import { Heart } from "./heart.entity";
import {  Writing } from "./writing.entity";

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
        () => Writing,
        (writing)=>writing.user
    )
    writings: Writing[];

    @OneToMany(
        () => Heart,
        (heart)=>heart.user
    )
    hearts: Heart[];

    @OneToMany(
        () => Application,
        (application)=>application.user
    )
    applications: Heart[];
}