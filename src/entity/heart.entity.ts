import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
import { Writing } from "./writing.entity";
import { User } from "./user.entity";

@Entity()
export class Heart{

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '아이디'})
    id: number;

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
        (user) => user.hearts
    )
    user: User;
    
    @ManyToOne(
        () => Writing,
        (writing) => writing.hearts
    )
    writing: Writing;
} 