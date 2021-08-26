import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Application } from "./application.entity";
import { Comment } from "./comment.entity";
import { Heart } from "./heart.entity";
import { User } from "./user.entity";

@Entity()
export class Writing{

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

    @Column()
    @ApiProperty({ description: '마감 일자'})
    period: string;

    //카테고리는 문자열로 하고 띄어쓰기나 쉼표로 구분해서 저장
    //카테고리로 분류할 때는 해당 단어가 들어갔는지로 구분해야 할 듯
    @Column({
        nullable: true,
    })
    @ApiProperty({ description: '카테고리'})
    category: string;

    @Column({
        nullable:false
    })
    @ApiProperty({description:'유저 외래키'})
    userId:number;

    @OneToMany(
        () => Comment,
        (comment)=>comment.writing
    )
    comments: Comment[];

    @OneToMany(
        () => Heart,
        (heart)=>heart.writing
    )
    hearts: Heart[];

    @OneToMany(
        () => Application,
        (application)=>application.writing
    )
    applications: Application[];

    @ManyToOne(
        () => User,
        (user) => user.writings
    )
    user: User;
} 