// Note : This has to be cron job
import { LiabilityTreeRepository, TreeMetadataRepository } from "../services/postgresql"
import { createLiabilitiesTree } from "proof-of-liabilities"
import { GaloyAccountService } from "../services/AccountService"

export const createTree = async (): Promise<LiabilityTree | Error> => {
  const accounts = await GaloyAccountService().fetchAccounts()
  if (accounts instanceof Error) return accounts
  const tree = await createLiabilitiesTree(accounts)
  if (tree instanceof Error) return tree
  const treeMetadata = await TreeMetadataRepository().persistNew({
    roothash: tree.merkleTree[0][0].hash,
    totalBalance: tree.merkleTree[0][0].sum,
  })
  if (treeMetadata instanceof Error) throw treeMetadata
  return LiabilityTreeRepository().persistNew(tree, treeMetadata.roothash)
}
