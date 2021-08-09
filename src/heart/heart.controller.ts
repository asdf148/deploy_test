import { Controller, Delete, Get, Headers, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HeartService } from './heart.service';

@Controller('heart')
@ApiTags('Heart')
export class HeartController {
    constructor(private readonly heartService:HeartService) {}

    @Get('/:id')
    @ApiOperation({summary:'하트 누름', description:'하트 생성'})
    @ApiOkResponse({description:'하트 생성', type:String })
    async pressHeart(@Headers('Authorization') token:string, @Param('id') writing_id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{

        const result:string = await this.heartService.create(token, writing_id);

        return res.status(HttpStatus.OK).json({result:result});
    }

    @Delete('/:id')
    @ApiOperation({summary:'하트 취소', description:'하트 삭제'})
    @ApiOkResponse({description:'하트 삭제', type:String })
    async cancelHeart(@Param('id') id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{

        const result:string = await this.heartService.delete(id);

        return res.status(HttpStatus.OK).json({result:result});

    }
}
