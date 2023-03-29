import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User, Post],
  migrations: ['src/v1/database/migrations/**/*.ts'],
});
