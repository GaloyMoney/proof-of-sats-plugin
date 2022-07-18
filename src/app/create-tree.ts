import { fileSystemLiabilityTreeRepository } from "../services/LiabilityTreeRepository/fileSystemLiabilityTreeRepository"
import { createLiabilitiesTree } from "proof-of-liabilities"
import { GaloyAccountService } from "../services/AccountService/galoy-account-service"
import { createTreeMetadata } from "./create-tree-metadata"

export const createTree = async (): Promise<LiabilityTree | Error> => {
  const accounts = await GaloyAccountService().fetchAccounts()
  if (accounts instanceof Error) return accounts
  const tree = await createLiabilitiesTree(accounts)
  if (tree instanceof Error) return tree
  const treeMetadata = await createTreeMetadata(
    tree.merkleTree[0][0].hash,
    tree.merkleTree[0][0].sum,
  )
  if (treeMetadata instanceof Error) throw treeMetadata
  return await fileSystemLiabilityTreeRepository().persistNew(
    tree,
    tree.merkleTree[0][0].hash,
  )
}
