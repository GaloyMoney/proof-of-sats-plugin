import * as fs from "fs"
import { DIRECTORY } from "../../config"
export const fileSystemLiabilityTreeRepository = (): ILiabilityTreeRepository => {
  const persistNew = async (tree: Tree, name: string): Promise<LiabilityTree | Error> => {
    const fileName = `${name}.json`
    const filePath = `${DIRECTORY}${fileName}`
    const jsonMerkleTree = JSON.stringify(tree.merkleTree)
    const jsonAccountToNonceMap = JSON.stringify(
      Array.from(tree.accountToNonceMap.entries()),
    )
    const treeMetadata = {
      roothash: tree.merkleTree[0][0].hash,
      totalBalance: tree.merkleTree[0][0].sum,
      timestamp: Date.now(),
    }
    const jsonTreeMetadata = JSON.stringify(treeMetadata)
    await fs.writeFileSync(
      filePath,
      `{"merkleTree":${jsonMerkleTree},\n"accountToNonceMap":${jsonAccountToNonceMap},\n"treeMetadata":${jsonTreeMetadata}}`,
    )
    return {
      merkleTree: tree.merkleTree,
      accountToNonceMap: tree.accountToNonceMap,
      treeMetadata,
    }
  }
  const findLiabilityTree = async (name: string): Promise<LiabilityTree | Error> => {
    const fileName = `${name}.json`
    const filePath = `${DIRECTORY}${fileName}`
    const json = await fs.readFileSync(filePath, "utf8")
    const result = JSON.parse(json)
    return {
      merkleTree: result.merkleTree,
      accountToNonceMap: new Map(result.accountToNonceMap),
      treeMetadata: result.treeMetadata,
    }
  }
  return {
    persistNew,
    findLiabilityTree,
  }
}
