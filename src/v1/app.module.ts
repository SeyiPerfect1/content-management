import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/category.module';
import { PostsModule } from './modules/posts/post.module';
import { UsersModule } from './modules/users/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}