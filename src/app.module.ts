import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Post } from './entity/post.entity';
import { User } from './entity/user.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Post]),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
