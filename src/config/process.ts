export const databaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "", 10) || 5444,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PWD || "vaibhav09",
  database: process.env.DB_DB || "proof_of_liabilities",
  poolMin: parseInt(process.env.DB_POOL_MIN || "", 10) || 1,
  poolMax: parseInt(process.env.DB_POOL_MAX || "", 10) || 5,
  debug: process.env.DB_DEBUG === "true",
}
