import { Module } from '@nestjs/common';
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
import { MailModule } from './mailer/mailer.module';
import { mailerValidationSchema } from './mailer/config/mailer.config.validation';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: +config.get('THROTTLE_TTL') || 5,
        limit: +config.get('THROTTLE_LIMIT') || 60,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: dbConfigValidationSchema,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: jwtValidationSchema,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mailerValidationSchema,
    }),
    MailModule,
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
