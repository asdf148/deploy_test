import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiFoundResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { Post } from 'src/entity/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService) {}

    @Get('/')
    @ApiOperation({summary:'게시물 다 가져오기', description:'게시물 다 가져오기'})
    @ApiFoundResponse({description:'게시물 다 가져오기', type:Array })
    async findAll(@Res() res:Response) {
        let posts:Post[] = await this.postService.findAll()

        return res.status(HttpStatus.OK).json({posts:posts})
    }
}
