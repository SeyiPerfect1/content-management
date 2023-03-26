import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/category.module';
import { PostsModule } from './posts/post.module';
import { UsersModule } from './users/user.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/typeorm.module';
import { dbConfigValidationSchema } from './database/config/typeorm.config.validation';
import { AuthModule } from './auth/auth.module';
import { jwtValidationSchema } from './auth/config/auth.config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: dbConfigValidationSchema,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: jwtValidationSchema,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
