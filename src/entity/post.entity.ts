import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Application } from "./application.entity";
import { Heart } from "./heart.entity";
import { User } from "./user.entity";

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @Column({
        nullable: true,
    })
    @ApiProperty({ description: '모집글 바탕 이미지 경로'})
    imagePath: string;

    @Column()
    @ApiProperty({ description: '제목'})
    title: string;

    @Column()
    @ApiProperty({ description: '내용'})
    content: string;

    @Column()
    @ApiProperty({ description: '인원'})
    personnel: number;

    @CreateDateColumn()
    @ApiProperty({ description: '생성 일자'})
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '수정 일자'})
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.id
    )
    @JoinColumn({
        name: 'user_id'
    })
    userId: User;

    @Column()
    @ApiProperty({ description: '마감 일자'})
    period: Date;

    //카테고리는 문자열로 하고 띄어쓰기나 쉼표로 구분해서 저장
    //카테고리로 분류할 때는 해당 단어가 들어갔는지로 구분해야 할 듯
    @Column({
        nullable: true,
    })
    @ApiProperty({ description: '카테고리'})
    category: string;

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