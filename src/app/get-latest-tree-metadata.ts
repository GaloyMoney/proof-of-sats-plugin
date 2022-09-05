import { CouldNotFindTreeMetadataError } from "@domain/error"

import { TreeMetadataRepository } from "@services/postgresql"

export const getLatestTreeMetadata = async (): Promise<
  TreeMetadata | CouldNotFindTreeMetadataError
> => {
  return TreeMetadataRepository().findLatestTreeMetadata()
}
