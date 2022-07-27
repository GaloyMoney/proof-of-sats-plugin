import { Pool } from "pg"

const pool = new Pool({
  host: "localhost" || process.env.POSTGRES_HOST,
  port: 5432 || process.env.POSTGRES_PORT,
  user: "postgres" || process.env.POSTGRES_USER,
  password: "vaibhav09" || process.env.POSTGRES_PASSWORD,
  database: "pol" || process.env.POSTGRES_DATABASE,
  max: 10 || process.env.POSTGRES_MAX,
  idleTimeoutMillis: 30000 || process.env.POSTGRES_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis: 2000 || process.env.POSTGRES_CONNECTION_TIMEOUT_MILLIS,
})

export default pool
