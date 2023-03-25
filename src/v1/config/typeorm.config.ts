import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfigOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@Oluperfect1',
  database: 'content_management',
  entities: [],
  synchronize: true,
};
