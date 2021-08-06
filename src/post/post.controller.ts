import { Controller, Get, Post, HttpStatus, Res, UseInterceptors, Body, UploadedFile, Put, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Writing } from 'src/entity/writing.entity';
import { CreateWriting } from 'src/entity/writing_dto/createWriting.dto';
import { UpdateWriting } from 'src/entity/writing_dto/updateWriting.dto';
import { multerOptions } from 'src/multerOptions';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
    constructor(private readonly postService:PostService) {}

    @Get('/:id')
    @ApiOperation({summary:'게시물 한 개 가져오기', description:'게시물 한 개 가져오기'})
    @ApiFoundResponse({description:'게시물 한 개 가져오기', type:Writing })
    async detail(@Param('id') id:string, @Res() res:Response){

    }

    @Get('/')
    @ApiOperation({summary:'게시물 다 가져오기', description:'게시물 다 가져오기'})
    @ApiFoundResponse({description:'게시물 다 가져오기', type:Array })
    async findAll(@Res() res:Response):Promise<Response<any, Record<string, any>>> {
        let posts:Writing[] = await this.postService.findAll()

        return res.status(HttpStatus.OK).json({posts:posts})
    }

    @Post('/write')
    @UseInterceptors(FileInterceptor('file',multerOptions))
    @ApiOperation({summary:'게시물 작성', description:'글 생성'})
    @ApiOkResponse({description:'글 생성', type:Writing })
    async write(@UploadedFile() file:Express.Multer.File, @Body() createWriting:CreateWriting, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        let writing:Writing = await this.postService.create(file, createWriting);

        return res.status(HttpStatus.CREATED).json({writing:writing});
    }

    @Put('/update/:id')
    @ApiOperation({summary:'게시물 수정', description:'글 수정'})
    @ApiOkResponse({description:'글 수정', type:UpdateResult })
    async update(@Param('id') id:string, @Body() updateWriting:UpdateWriting, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:UpdateResult = await this.postService.update(id, updateWriting);

        return res.status(HttpStatus.OK).json({result:result});
    }
    
    @Delete('/delete/:id')
    @ApiOperation({summary:'게시물 삭제', description:'글 삭제'})
    @ApiOkResponse({description:'글 삭제', type:DeleteResult })
    async delete(@Param('id') id:string, @Res() res:Response){

    }
}
