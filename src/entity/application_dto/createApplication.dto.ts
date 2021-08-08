import { ApiProperty } from "@nestjs/swagger";

export class CreateApplication{
    @ApiProperty({ description: '이름'})
    name: string;

    @ApiProperty({ description: '전화번호'})
    phone_number: number;

    @ApiProperty({ description: '각오 한 마디'})
    sentence: string;
} 