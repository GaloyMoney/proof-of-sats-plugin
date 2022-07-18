import { TreeMetadataRepository } from "../services/mongoose/tree-metadata"

export const createTreeMetadata = async (
  roothash,
  totalbalance,
): Promise<TreeMetadata | Error> => {
  return await TreeMetadataRepository().persistNew(roothash, totalbalance)
}
