import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Comment } from 'src/entity/comment.entity';
import { CreateComment } from 'src/entity/comment_dto/createComment.dto';
import { UpdateComment } from 'src/entity/comment_dto/updateComment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CommentService } from './comment.service';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
    constructor(private readonly commentService:CommentService) {}

    @Get('/findAll/:id')
    @ApiOperation({summary:"해당 게시물 댓글 다 가져오기", description:"해당 게시물 댓글 다 가져오기"})
    @ApiOkResponse({description:"해당 게시물 댓글 다 가져오기", type:Array})
    async findAll(@Param('id') post_id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const comments:Comment[] = await this.commentService.findAll(post_id);

        return res.status(HttpStatus.OK).json({comments:comments});
    }

    @Post('/write/:id')
    @ApiOperation({summary:"해당 게시물 댓글 달기", description:"해당 게시물 댓글 달기"})
    @ApiOkResponse({description:"해당 게시물 댓글 달기", type:Comment})
    async write(@Headers('Authorization') token:string,@Param('id') post_id:string, @Body() createComment:CreateComment, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const comment:Comment|string = await this.commentService.create(token, post_id, createComment);

        if(typeof comment == "string"){
            return res.status(HttpStatus.BAD_REQUEST).json({error:comment});
        }

        return res.status(HttpStatus.OK).json({comment:comment});
    }

    @Put('/:id')
    @ApiOperation({summary:"댓글 수정", description:"댓글 수정"})
    @ApiOkResponse({description:"댓글 수정", type:UpdateResult})
    async modify(@Param('id') id:string, @Body() updateComment:UpdateComment, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:UpdateResult = await this.commentService.update(id, updateComment);

        return res.status(HttpStatus.OK).json({result:result});
    }

    @Delete('/:id')
    @ApiOperation({summary:"댓글 삭제", description:"댓글 삭제"})
    @ApiOkResponse({description:"댓글 삭제", type:DeleteResult})
    async delete(@Param('id') id:string, @Res() res:Response):Promise<Response<any, Record<string, any>>>{
        const result:DeleteResult = await this.commentService.delete(id);

        return res.status(HttpStatus.OK).json({result:result});
    }
}
