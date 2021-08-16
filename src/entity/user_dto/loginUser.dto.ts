import { ApiProperty } from "@nestjs/swagger";

export class LoginUser{
    @ApiProperty({description: '이메일', example:'naver@naver.com'})
    email: string;

    @ApiProperty({description: '비밀번호', example:'asdfqw12'})
    password: string;
}