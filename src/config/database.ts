import { Knex } from "knex"

import { databaseConfig } from "./process"

const { host, port, user, password, database, poolMin, poolMax } = databaseConfig

const config: Knex.Config = {
  client: "pg",
  connection: {
    host,
    port,
    user,
    password,
    database,
  },
  pool: {
    min: poolMin,
    max: poolMax,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./database/migrations",
  },
}
export default config
