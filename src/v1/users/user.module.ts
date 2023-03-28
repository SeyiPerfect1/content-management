import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UsersRepository]),
    forwardRef(() => AuthModule),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
