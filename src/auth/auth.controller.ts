import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/entity/user.entity';
import { CreateUser } from 'src/entity/user_dto/createUser.dto';
import { LoginUser } from 'src/entity/user_dto/loginUser.dto';
import { multerPFOptions } from 'src/multerOptions';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/join')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',multerPFOptions))
    @ApiOperation({summary: '회원가입', description: '유저 생성'})
    @ApiCreatedResponse({description: '유저 생성', type: User})
    async join(@Body() createUser:CreateUser, @UploadedFile() file:Express.Multer.File, @Res() res:Response){
        let user:User = await this.authService.create(createUser, file);

        return res.status(HttpStatus.CREATED).json({user:user});
    }

    @Post('/login')
    @ApiOperation({summary:'로그인', description:'jwt-token 생성'})
    @ApiOkResponse({description:'jwt-token 생성', type:String})
    async login(@Body() loginUser:LoginUser, @Res() res:Response){
        let token:string = await this.authService.issueToken(loginUser);

        return res.status(HttpStatus.OK).json({token:token});
    }

    @Get('/user')
    @ApiOperation({summary:'유저 찾기', description:'유저 찾기'})
    @ApiFoundResponse({description:'유저 찾기', type:User})
    async findUser(@Headers('authorization') token:string, @Res() res:Response){
        let foundUser: User|string = await this.authService.findOne(token);

        if(typeof foundUser == "string"){
            return res.status(HttpStatus.BAD_REQUEST).json({tokenError:foundUser});
        }

        return res.status(HttpStatus.OK).json({foundUser:foundUser});
    }

    @Get('/userAndrelation')
    @ApiOperation({summary:'마이 페이지', description:'유저, 게시물 찾기'})
    @ApiFoundResponse({description:'유저, 게시물 찾기', type:User})
    async myPage(@Headers('authorization') token:string, @Res() res:Response){
        let foundUser: User|string = await this.authService.findOneAndRelation(token);

        if(typeof foundUser == "string"){
            return res.status(HttpStatus.BAD_REQUEST).json({tokenError:foundUser});
        }

        return res.status(HttpStatus.OK).json({foundUser:foundUser});
    }
}
