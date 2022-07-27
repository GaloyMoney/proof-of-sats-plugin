import { LiabilityTreeRepository } from "../services/LiabilityTreeRepository/liabilityTreeRepository"

export const getTree = async (roothash: string): Promise<LiabilityTree | Error> => {
  return await LiabilityTreeRepository().findLiabilityTree(roothash)
}
