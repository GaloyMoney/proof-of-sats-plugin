import { createTree } from "../app"
import { pool } from "../services/postgresql"

pool
  .connect()
  .then(async () => {
    console.log("Connected!")
    await createTree()
  })
  .then(async () => {
    pool.end()
    console.log("Disconnected!")
  })
