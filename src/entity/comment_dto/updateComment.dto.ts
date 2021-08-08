import { ApiProperty } from "@nestjs/swagger";

export class UpdateComment{
    @ApiProperty({ description: '내용'})
    content: string;
}