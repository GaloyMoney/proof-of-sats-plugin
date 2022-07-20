import { TreeMetadataRepository } from "../services/mongoose/tree-metadata"

export const createTreeMetadata = async (
  treeMetadataArgs: TreeMetadataArgs,
): Promise<TreeMetadata | Error> => {
  return await TreeMetadataRepository().persistNew(
    treeMetadataArgs.roothash,
    treeMetadataArgs.totalBalance,
  )
}
