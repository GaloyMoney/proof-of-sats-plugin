import knex from "knex"
import { databaseClientConfig } from "../../config"
export const queryBuilder = knex(databaseClientConfig)
export const closeDbConnection = (): Promise<void> => queryBuilder.destroy()
