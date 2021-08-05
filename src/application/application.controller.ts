import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Application } from 'src/entity/application.entity';
import { CreateApplication } from 'src/entity/application_dto/createApplication.dto';
import { DeleteResult } from 'typeorm';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService:ApplicationService) {}

    @Get('/yes/:id')
    @ApiOperation({summary:'스터디 신청 수락', description:'신청서 상태 수락으로 변경'})
    @ApiOkResponse({description:'신청서 상태 수락으로 변경', type:String })
    async accept(@Param('id') id:string, @Res() res:Response){

    }

    @Get('/no/:id')
    @ApiOperation({summary:'스터디 거절', description:'신청서 상태 거절로 변경'})
    @ApiOkResponse({description:'신청서 상태 거절로 변경', type:String })
    async refusal(@Param('id') id:string, @Res() res:Response){

    }

    @Get('/:id')
    @ApiOperation({summary:'스터디 신청 목록 보기', description:'신청서 찾기'})
    @ApiOkResponse({description:'신청서 찾기', type:Array })
    async findAll(@Param('id') post_id:string, @Res() res:Response){

    }

    @Post('/:id')
    @ApiOperation({summary:'스터디 신청', description:'신청서 생성'})
    @ApiOkResponse({description:'신청서 생성', type:Application })
    async create(@Param('id') post_id:string, @Body() createApplication:CreateApplication, @Res() res:Response){

    }

    @Delete('/:id')
    @ApiOperation({summary:'스터디 취소', description:'신청서 삭제'})
    @ApiOkResponse({description:'신청서 삭제', type:DeleteResult })
    async cancel(@Param('id') id:string, @Res() res:Response){

    }
}
