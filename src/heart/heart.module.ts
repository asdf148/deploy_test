import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeartRepository } from 'src/entity/repository/heart.repository';
import { UserRepository } from 'src/entity/repository/user.repository';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { HeartController } from './heart.controller';
import { HeartService } from './heart.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, WritingRepository, HeartRepository])],
  controllers: [HeartController],
  providers: [HeartService]
})
export class HeartModule {}
