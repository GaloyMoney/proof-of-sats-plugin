import { fileSystemLiabilityTreeRepository } from "../services/LiabilityTreeRepository/fileSystemLiabilityTreeRepository"

export const getTree = async (merkleRoot: string): Promise<LiabilityTree | Error> => {
  return await fileSystemLiabilityTreeRepository().findLiabilityTree(merkleRoot)
}
