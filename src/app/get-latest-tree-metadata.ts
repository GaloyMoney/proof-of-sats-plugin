import { TreeMetadataRepository } from "../services/TreeMetadataRepository/treeMetadataRepository"

export const getLatestTreeMetadata = async (): Promise<TreeMetadata | Error> => {
  return TreeMetadataRepository().findLatestTreeMetadata()
}
