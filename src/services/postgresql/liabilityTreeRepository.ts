import { CouldNotFindError, UnknownRepositoryError } from "../../domain/error"
import { pool } from "./postgres-config"

export const LiabilityTreeRepository = (): ILiabilityTreeRepository => {
  const persistNew = async (
    tree: LiabilityTree,
    roothash: string,
  ): Promise<LiabilityTree | Error> => {
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
      return new UnknownRepositoryError(err)
    }
  }
  const findLiabilityTree = async (roothash: string): Promise<LiabilityTree | Error> => {
    try {
      const query = "SELECT * FROM liability_tree WHERE roothash = $1"
      const values = [roothash]
      const result = await pool.query(query, values)
      if (result.rows.length === 0) {
        return new Error("Liability tree not found")
      }
      return {
        merkleTree: result.rows[0].merkle_tree,
        accountToNonceMap: new Map(result.rows[0].account_to_nonce_map),
      }
    } catch (err) {
      return new CouldNotFindError(err)
    }
  }

  return {
    persistNew,
    findLiabilityTree,
  }
}
