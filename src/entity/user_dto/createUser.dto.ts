import { ApiProperty } from "@nestjs/swagger";

export class CreateUser{
    @ApiProperty({description: '닉네임', example:'테스트'})
    nick: string;

    @ApiProperty({description: '이메일', example:'naver@naver.com'})
    email: string;

    @ApiProperty({description: '비밀번호', example:'asdfqw12'})
    password: string;

    @ApiProperty({description: '재확인 비밀번호', example:'asdfqw12'})
    re_password: string;
}