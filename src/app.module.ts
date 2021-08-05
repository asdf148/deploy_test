import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Writing } from './entity/writing.entity';
import { User } from './entity/user.entity';
import { PostModule } from './post/post.module';
import { HeartModule } from './heart/heart.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Writing]),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    PostModule,
    HeartModule,
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
