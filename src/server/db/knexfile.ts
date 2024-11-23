import type { Knex } from "knex";
import path from "path";

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: path.resolve(__dirname, "db.sqlite3"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export default config;