import dotenv from "dotenv"

import { createTree } from "@app"
import { closeDbConnection } from "@services"

dotenv.config()
const startServer = async () => {
  await createTree()
  await closeDbConnection()
}
if (require.main === module) {
  startServer()
}
