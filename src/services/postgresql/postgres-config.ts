import { Pool } from "pg"

export const pool = new Pool({
  host: "localhost",
  port: 5444,
  user: "postgres",
  password: "vaibhav09",
  database: "pol",
})
