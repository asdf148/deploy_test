import { Controller, Get, Post, HttpStatus, Res, UseInterceptors, Body, UploadedFile, Put, Param, Delete, Headers, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Writing } from 'src/entity/writing.entity';
import { CreateWriting } from 'src/entity/writing_dto/createWriting.dto';
import { UpdateWriting } from 'src/entity/writing_dto/updateWriting.dto';
import { multerBGOptions } from 'src/multerOptions';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
    constructor(private readonly postService:PostService) {}

    @Get('/')
    @ApiOperation({summary:'메인 페이지', description:'메인페이지 page=(페이지 넘버)&limit=(게시물 수)'})
    @ApiFoundResponse({description:'게시물 여러개 가져오기', type:Array })
    async mainPage(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Writing>> {
        limit = limit > 100 ? 100 : limit;
        return this.postService.paginate({
        page,
        limit,
        route: 'https://qovh.herokuapp.com/post/',
        });
    }

    @Get('/category')
    @ApiOperation({summary:'카테고리로 분류', description:'카테고리로 분류(제대로 안돼는 듯)'})
    @ApiFoundResponse({description:'카테고리로 분류', type:Array})
    async search(
        @Query("category") category: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Writing>>{
        limit = limit > 100 ? 100 : limit;
        return this.postService.findByCategory(category, {
        page,
        limit,
        route: 'https://qovh.herokuapp.com/post/',
        });
    }
    
    @Get('/:id')
    @ApiOperation({summary:'게시물 한 개 가져오기', description:'게시물 한 개 가져오기'})
    @ApiFoundResponse({description:'게시물 한 개 가져오기', type:Writing })
    async detail(@Param('id') id:string, @Res() res:Response){
        const writing:Writing = await this.postService.findOne(id);

        return res.status(HttpStatus.OK).json({post:writing});
    }

    // @Get('/')
    // @ApiOperation({summary:'게시물 다 가져오기', description:'게시물 다 가져오기'})
    // @ApiFoundResponse({description:'게시물 다 가져오기', type:Array })
    // async findAll(@Res() res:Response):Promise<Response<any, Record<string, any>>> {
    //     let posts:Writing[] = await this.postService.findAll()

    //     return res.status(HttpStatus.OK).json({posts:posts})
    // }

    @Post('/write')
    // Swagger에 file, header 추가하는 방법도 찾아 봐야 함
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',multerBGOptions))
    @ApiOperation({summary:'게시물 작성', description:'글 생성'})
    @ApiOkResponse({description:'글 생성', type:Writing })
    async write(@Headers('authorization') token:string, @UploadedFile() file:Express.Multer.File, @Body() createWriting:CreateWriting, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const writing:Writing|string = await this.postService.create(token, file, createWriting);

        if(typeof writing == "string"){
            return res.status(HttpStatus.BAD_REQUEST).json({error:writing});
        }

        return res.status(HttpStatus.CREATED).json({writing:writing});
    }

    @Put('/:id')
    @ApiOperation({summary:'게시물 수정', description:'글 수정'})
    @ApiOkResponse({description:'글 수정', type:UpdateResult })
    async update(@Param('id') id:string, @Body() updateWriting:UpdateWriting, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:UpdateResult = await this.postService.update(id, updateWriting);

        return res.status(HttpStatus.OK).json({result:result});
    }
    
    @Delete('/:id')
    @ApiOperation({summary:'게시물 삭제', description:'글 삭제'})
    @ApiOkResponse({description:'글 삭제', type:DeleteResult })
    async delete(@Param('id') id:string, @Res() res:Response){
        const result:DeleteResult = await this.postService.delete(id);

        return res.status(HttpStatus.OK).json({result:result});
    }
}
