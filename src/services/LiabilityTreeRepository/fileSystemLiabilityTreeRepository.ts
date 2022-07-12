import * as fs from "fs"
import path from "path"
import { LIABILITY_TREE_DIRECTORY } from "../../config"
export const fileSystemLiabilityTreeRepository = (): ILiabilityTreeRepository => {
  const persistNew = async (
    tree: LiabilityTree,
    name: string,
  ): Promise<LiabilityTree | Error> => {
    const fileName = `${name}.json`
    const filePath = path.join(LIABILITY_TREE_DIRECTORY, fileName)
    const jsonMerkleTree = JSON.stringify(tree.merkleTree)
    const jsonAccountToNonceMap = JSON.stringify(
      Array.from(tree.accountToNonceMap.entries()),
    )
    await fs.writeFileSync(
      filePath,
      `{"merkleTree":${jsonMerkleTree},\n"accountToNonceMap":${jsonAccountToNonceMap}}`,
    )
    return tree
  }
  const findLiabilityTree = async (name: string): Promise<LiabilityTree | Error> => {
    const fileName = `${name}.json`
    const filePath = path.join(LIABILITY_TREE_DIRECTORY, fileName)
    const json = await fs.readFileSync(filePath, "utf8")
    const result = JSON.parse(json)
    return {
      merkleTree: result.merkleTree,
      accountToNonceMap: new Map(result.accountToNonceMap),
    }
  }
  return {
    persistNew,
    findLiabilityTree,
  }
}
