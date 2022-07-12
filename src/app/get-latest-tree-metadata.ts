import { TreeMetadataRepository } from "../services/mongoose/tree-metadata"

export const getLatestTreeMetadata = async (): Promise<TreeMetadata | Error> => {
  return TreeMetadataRepository().findLatestTreeMetadata()
}
