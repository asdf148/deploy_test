import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from 'src/entity/repository/application.repository';
import { UserRepository } from 'src/entity/repository/user.repository';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, WritingRepository, ApplicationRepository])],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
