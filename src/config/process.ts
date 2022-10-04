export const databaseConfig = {
  host: process.env.DB_HOST || "postgres",
  port: parseInt(process.env.DB_PORT || "", 10) || 5432,
  user: process.env.DB_USER || "galoy-proof-of-sats-usr",
  password: process.env.DB_PWD || "galoy-proof-of-sats-pwd",
  database: process.env.DB_DB || "galoy-proof-of-sats",
  poolMin: parseInt(process.env.DB_POOL_MIN || "", 10) || 1,
  poolMax: parseInt(process.env.DB_POOL_MAX || "", 10) || 5,
  debug: process.env.DB_DEBUG === "true",
}
