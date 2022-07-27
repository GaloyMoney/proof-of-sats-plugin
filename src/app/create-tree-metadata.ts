import { TreeMetadataRepository } from "../services/TreeMetadataRepository/treeMetadataRepository"

export const createTreeMetadata = async (
  treeMetadataArgs: TreeMetadataArgs,
): Promise<TreeMetadata | Error> => {
  const { roothash, totalBalance } = treeMetadataArgs
  return TreeMetadataRepository().persistNew({ roothash, totalBalance })
}
