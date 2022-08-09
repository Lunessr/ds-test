import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { Links } from "../modules/links/links.entity";

export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Links],
      migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
      cli: {
        migrationsDir: __dirname + "/../database/migrations",
      },
      synchronize: false,
      logging: true,
    };
  },
};

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Links],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: __dirname + "/../database/migrations",
  },
  synchronize: false,
  logging: true,
};
