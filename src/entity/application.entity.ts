import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn} from "typeorm";
import { Writing } from "./writing.entity";
import { User } from "./user.entity";

@Entity()
export class Application{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

    @Column()
    @ApiProperty({ description: '이름'})
    name: string;

    @Column()
    @ApiProperty({ description: '전화번호'})
    phone_number: string;

    @Column()
    @ApiProperty({ description: '각오 한 마디'})
    sentence: string;

    @Column({
        default: "wait"
    })
    @ApiProperty({ description: '수락 여부'})
    accep_status: string;

    @Column({
        nullable: false
    })
    @ApiProperty({ description: '게시글 외래키'})
    writingId:number;

    @Column({
        nullable: false
    })
    @ApiProperty({ description: '유저 외래키'})
    userId:number;

    @ManyToOne(
        () => User,
        (user) => user.applications
    )
    user: User;
    
    @ManyToOne(
        () => Writing,
        (writing) => writing.applications
    )
    writing: Writing;
} 