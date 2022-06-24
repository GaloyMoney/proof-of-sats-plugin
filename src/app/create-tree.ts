import { fileSystemLiabilityTreeRepository } from "../services/fileSystemLiabilityTreeRepository"
import { accounts } from "../graphql/helper"
import { createLiabilitiesTree } from "proof-of-liabilities"

export const createTree = async (): Promise<LiabilityTree | Error> => {
  const tree = await createLiabilitiesTree(accounts)
  if (tree instanceof Error) return tree
  console.log(tree)
  const result = await fileSystemLiabilityTreeRepository().persistNew(
    tree,
    tree.merkleTree[0][0].hash,
  )
  return result
}
