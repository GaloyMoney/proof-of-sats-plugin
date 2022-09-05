// referenced from galoy price repo

import { createTree } from "@app"

import { closeDbConnection } from "@services"

const startServer = async () => {
  await createTree()
  await closeDbConnection()
}
if (require.main === module) {
  startServer()
}
