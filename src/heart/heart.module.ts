import { Module } from '@nestjs/common';
import { HeartController } from './heart.controller';
import { HeartService } from './heart.service';

@Module({
  controllers: [HeartController],
  providers: [HeartService]
})
export class HeartModule {}
