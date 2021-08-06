import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HeartService } from './heart.service';

@Controller('heart')
@ApiTags('Heart')
export class HeartController {
    constructor(private readonly heartService:HeartService) {}

    @Get('/:id')
    @ApiOperation({summary:'하트 누름', description:'하트 생성'})
    @ApiOkResponse({description:'하트 생성', type:String })
    async addHeart(){

    }

    @Delete('/:id')
    @ApiOperation({summary:'하트 취소', description:'하트 삭제'})
    @ApiOkResponse({description:'하트 삭제', type:String })
    async deleteHeart(){

    }
}
