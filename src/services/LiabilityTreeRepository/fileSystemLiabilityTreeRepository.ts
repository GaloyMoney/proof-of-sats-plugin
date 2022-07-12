import * as fs from "fs"
import path from "path"
import * as dotenv from "dotenv"
import { TreeMetadataRepository } from "../mongoose/tree-metadata"
import connectDB from "../mongodb/index"

dotenv.config()
export const fileSystemLiabilityTreeRepository = (): ILiabilityTreeRepository => {
  const persistNew = async (
    tree: LiabilityTree,
    name: string,
  ): Promise<LiabilityTree | Error> => {
    await connectDB()
    const fileName = `${name}.json`
    const filePath = path.join(process.env.LIABILITY_TREE_DIRECTORY!, fileName)
    const jsonMerkleTree = JSON.stringify(tree.merkleTree)
    const jsonAccountToNonceMap = JSON.stringify(
      Array.from(tree.accountToNonceMap.entries()),
    )
    await fs.writeFileSync(
      filePath,
      `{"merkleTree":${jsonMerkleTree},\n"accountToNonceMap":${jsonAccountToNonceMap}}`,
    )
    await TreeMetadataRepository().persistNew(
      tree.merkleTree[0][0].hash,
      tree.merkleTree[0][0].sum,
    )

    return tree
  }
  const findLiabilityTree = async (name: string): Promise<LiabilityTree | Error> => {
    const fileName = `${name}.json`
    const filePath = path.join(process.env.LIABILITY_TREE_DIRECTORY!, fileName)
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
