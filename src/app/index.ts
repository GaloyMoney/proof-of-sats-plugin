export * from "./create-tree"
export * from "./get-latest-tree-metadata"

import { LiabilityTreeRepository } from "../services/postgresql"
export const getTree = async (roothash: string): Promise<LiabilityTree | Error> =>
  LiabilityTreeRepository().findLiabilityTree(roothash)
