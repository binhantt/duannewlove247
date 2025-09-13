import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2", // dùng mysql2 driver
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "newlove247",
      port: Number(process.env.DB_PORT) || 3306,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/infrastructure/database/migrations", // nơi lưu file migration
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/infrastructure/database/migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/infrastructure/database/migrations",
    },
  },
};

export default config;
