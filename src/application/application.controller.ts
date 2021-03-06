import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Application } from 'src/entity/application.entity';
import { CreateApplication } from 'src/entity/application_dto/createApplication.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApplicationService } from './application.service';

@Controller('application')
@ApiTags('Application')
export class ApplicationController {
    constructor(private readonly applicationService:ApplicationService) {}

    @Get('/:id')
    @ApiOperation({summary:'스터디 신청 목록 보기', description:'신청서 찾기'})
    @ApiOkResponse({description:'신청서 찾기', type:Array })
    async findAll(@Param('id') post_id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const applications:Application[] = await this.applicationService.findAll(post_id);

        return res.status(HttpStatus.OK).json({applications:applications});
    }

    @Post('/:id')
    @ApiOperation({summary:'스터디 신청', description:'신청서 생성'})
    @ApiOkResponse({description:'신청서 생성', type:Application })
    async create(@Headers('Authorization') token:string, @Param('id') post_id:string, @Body() createApplication:CreateApplication, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const application:Application|string = await this.applicationService.create(token, post_id, createApplication);

        if(typeof application == "string"){
            return res.status(HttpStatus.BAD_REQUEST).json({error:application});
        }

        return res.status(HttpStatus.OK).json({application:application});
    }

    @Patch('/yes/:id')
    @ApiOperation({summary:'스터디 신청 수락', description:'신청서 상태 수락으로 변경'})
    @ApiOkResponse({description:'신청서 상태 수락으로 변경', type:String })
    async accept(@Param('id') id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:UpdateResult = await this.applicationService.statusChange(id, "yes");

        return res.status(HttpStatus.OK).json({result:result});
    }

    @Patch('/no/:id')
    @ApiOperation({summary:'스터디 신청 거절', description:'신청서 상태 거절로 변경'})
    @ApiOkResponse({description:'신청서 상태 거절로 변경', type:String })
    async refusal(@Param('id') id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:UpdateResult = await this.applicationService.statusChange(id, "No");

        return res.status(HttpStatus.OK).json({result:result});
    }

    @Delete('/:id')
    @ApiOperation({summary:'스터디 신청 취소', description:'신청서 삭제'})
    @ApiOkResponse({description:'신청서 삭제', type:DeleteResult })
    async cancel(@Param('id') id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:DeleteResult = await this.applicationService.delete(id);

        return res.status(HttpStatus.OK).json({result:result});
    }
}
