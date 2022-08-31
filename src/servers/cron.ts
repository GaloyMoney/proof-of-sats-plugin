// referenced from galoy price repo

import { closeDbConnection } from "../services"
import { createTree } from "../app"

const startServer = async () => {
  await createTree()
  await closeDbConnection()
}
if (require.main === module) {
  startServer()
}
