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
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": 3306,
      "username": process.env.DB_USER,
      "password": process.env.DB_PWD,
      "database": process.env.DB_NM,
      "entities": ["dist/entity/*.entity{.ts,.js}"],
      "synchronize": true,
      "dropSchema": true,
      "timezone": "+09:00"
    }),
    TypeOrmModule.forFeature([User, Writing]),
    AuthModule,
    PostModule,
    HeartModule,
    ApplicationModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "public")
    })
  ],
  controllers: [AppController],
  providers: [AppService,],
}) 
export class AppModule {}
