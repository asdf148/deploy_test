import { ApiProperty } from "@nestjs/swagger";

export class CreateComment{
    @ApiProperty({ description: '내용'})
    content: string;
}