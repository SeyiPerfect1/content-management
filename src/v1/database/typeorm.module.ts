import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // to configure the DataSourceOptions.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Post],
        autoLoadEntities: true,
        synchronize: false, //process.env.NODE_ENV === 'development',
        logging: process.env.NODE_ENV === 'production',
        migrations: ['src/v1/database/migrations/**/*{.ts,.js}'],
        factories: ['src/v1/database/factories/**/*{.ts,.js}'],
        seeds: ['src/v1/database/seeds**/*{.ts,.js}'],
        cli: { migrationsDir: 'src/database/migrations' }
      }),

      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})

export class DatabaseModule {}
