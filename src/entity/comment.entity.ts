import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Writing } from "./writing.entity";
import { User } from "./user.entity";

@Entity()
export class Comment{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @Column()
    @ApiProperty({ description: '내용'})
    content: string;

    @CreateDateColumn()
    @ApiProperty({ description: '생성 일자'})
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '수정 일자'})
    updatedAt: Date;

    @Column({
        nullable:false
    })
    @ApiProperty({description:'유저 외래키'})
    userId:number;

    @Column({
        nullable:false
    })
    @ApiProperty({description:'게시물 외래키'})
    writingId:number;

    @ManyToOne(
        () => User,
        (user) => user.comments
    )
    user: User;

    @ManyToOne(
        () => Writing,
        (writing) => writing.comments
    )
    writing: Writing;
} 