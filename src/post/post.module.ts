import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([WritingRepository])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
