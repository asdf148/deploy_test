import { ApiProperty } from "@nestjs/swagger";

export class CreateWriting{

    @ApiProperty({ description: '제목'})
    title: string;

    @ApiProperty({ description: '내용'})
    content: string;

    @ApiProperty({ description: '인원'})
    personnel: number;

    @ApiProperty({ description: '마감 일자'})
    period: Date;

    @ApiProperty({ description: '카테고리'})
    category: string;
}