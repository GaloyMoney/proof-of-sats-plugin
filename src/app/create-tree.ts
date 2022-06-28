import { fileSystemLiabilityTreeRepository } from "../services/LiabilityTreeRepository/fileSystemLiabilityTreeRepository"
import { createLiabilitiesTree } from "proof-of-liabilities"
import { GaloyAccountService } from "../services/AccountService/galoy-account-service"

export const createTree = async (): Promise<LiabilityTree | Error> => {
  const accounts = await fetchAccounts()
  const tree = await createLiabilitiesTree(accounts)
  if (tree instanceof Error) return tree
  return await fileSystemLiabilityTreeRepository().persistNew(
    tree,
    tree.merkleTree[0][0].hash,
  )
}

export const fetchAccounts = () => {
  return GaloyAccountService().fetchAccounts()
}
