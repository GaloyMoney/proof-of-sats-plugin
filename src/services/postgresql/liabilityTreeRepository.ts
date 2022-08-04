/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import {
  CouldNotFindTreeError,
  CouldNotPersistTreeError,
  UnknownRepositoryError,
} from "../../domain/error"
import { pool } from "./postgres-config"

const LiabilityTreeCache = new Map<string, LiabilityTree>()
export const LiabilityTreeRepository = (): ILiabilityTreeRepository => {
  const persistNew = async (
    tree: LiabilityTree,
    roothash: string,
  ): Promise<LiabilityTree | CouldNotPersistTreeError> => {
    try {
      const jsonMerkleTree = JSON.stringify(tree.merkleTree)
      const jsonAccountToNonceMap = JSON.stringify(
        Array.from(tree.accountToNonceMap.entries()),
      )
      const query =
        "INSERT INTO liability_tree (roothash, merkle_tree, account_to_nonce_map) VALUES ($1, $2, $3) RETURNING *"
      const values = [roothash, jsonMerkleTree, jsonAccountToNonceMap]
      const result = await pool.query(query, values)
      return {
        merkleTree: result.rows[0].merkle_tree,
        accountToNonceMap: new Map(result.rows[0].account_to_nonce_map),
      }
    } catch (err) {
      return new CouldNotPersistTreeError(err)
    }
  }
  const findLiabilityTree = async (
    roothash: string,
  ): Promise<LiabilityTree | CouldNotFindTreeError> => {
    try {
      if (LiabilityTreeCache.has(roothash)) {
        return LiabilityTreeCache.get(roothash)!
      }
      const query = "SELECT * FROM liability_tree WHERE roothash = $1"
      const values = [roothash]
      const result = await pool.query(query, values)
      if (result.rows.length === 0) {
        return new CouldNotFindTreeError("Liability tree not found")
      }
      const liabilityTree: LiabilityTree = {
        merkleTree: result.rows[0].merkle_tree,
        accountToNonceMap: new Map(result.rows[0].account_to_nonce_map),
      }
      LiabilityTreeCache.set(liabilityTree.merkleTree[0][0].hash, liabilityTree)
      return liabilityTree
    } catch (err) {
      return new UnknownRepositoryError(err)
    }
  }

  return {
    persistNew,
    findLiabilityTree,
  }
}
