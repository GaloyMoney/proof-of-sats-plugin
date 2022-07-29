import { TreeMetadataRepository } from "../services/postgresql"

export const getLatestTreeMetadata = async (): Promise<TreeMetadata | Error> => {
  return TreeMetadataRepository().findLatestTreeMetadata()
}
