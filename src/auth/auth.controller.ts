import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/entity/user.entity';
import { CreateUser } from 'src/entity/user_dto/createUser.dto';
import { LoginUser } from 'src/entity/user_dto/loginUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/join')
    @ApiOperation({summary: '회원가입', description: '유저 생성'})
    @ApiCreatedResponse({description: '유저 생성', type: User})
    async join(@Body() createUser:CreateUser, @Res() res:Response){
        let user:User = await this.authService.create(createUser);

        return res.status(HttpStatus.CREATED).json({user:user});
    }

    @Post('/login')
    @ApiOperation({summary:'로그인', description:'jwt-token 생성'})
    @ApiOkResponse({description:'jwt-token 생성', type:String})
    async login(@Body() loginUser:LoginUser, @Res() res:Response){
        let token:string = await this.authService.issueToken(loginUser);

        return res.status(HttpStatus.OK).json({token:token});
    }

    @Get('/user/:id')
    @ApiOperation({summary:'유저 찾기', description:'유저 찾기'})
    @ApiFoundResponse({description:'유저 찾기', type:User})
    async findUser(@Param('id') id:string, @Res() res:Response){
        let foundUser: User = await this.authService.findOne(id);

        return res.status(HttpStatus.OK).json({foundUser:foundUser});
    }

    @Get('/userAndrelation/:id')
    @ApiOperation({summary:'마이 페이지', description:'유저, 게시물 찾기'})
    @ApiFoundResponse({description:'유저, 게시물 찾기', type:User})
    async myPage(@Param('id') id:string, @Res() res:Response){
        let foundUser: User = await this.authService.findOneAndRelation(id);

        return res.status(HttpStatus.OK).json({foundUser:foundUser});
    }
}
