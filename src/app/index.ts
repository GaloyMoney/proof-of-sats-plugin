export * from "./create-tree"
export * from "./get-latest-tree-metadata"

import { CouldNotFindTreeError } from "../domain/error"
import { LiabilityTreeRepository } from "../services/postgresql"
export const getTree = async (
  roothash: string,
): Promise<LiabilityTree | CouldNotFindTreeError> =>
  LiabilityTreeRepository().findLiabilityTree(roothash)
