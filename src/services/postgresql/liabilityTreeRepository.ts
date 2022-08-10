/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import {
  CouldNotFindTreeError,
  CouldNotPersistTreeError,
  UnknownRepositoryError,
} from "../../domain/error"

import { queryBuilder } from "./query-builder"
import { LRUCache } from "../../utils"

const LiabilityTreeCache = new LRUCache<LiabilityTree>(10)

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
      const result = await queryBuilder("liability_tree")
        .insert({
          roothash,
          merkle_tree: jsonMerkleTree,
          account_to_nonce_map: jsonAccountToNonceMap,
        })
        .returning(["merkle_tree", "account_to_nonce_map"])
      return {
        merkleTree: result[0].merkle_tree,
        accountToNonceMap: new Map(result[0].account_to_nonce_map),
      }
    } catch (err) {
      return new CouldNotPersistTreeError(err)
    }
  }
  const findLiabilityTree = async (
    roothash: string,
  ): Promise<LiabilityTree | CouldNotFindTreeError> => {
    try {
      if (LiabilityTreeCache.get(roothash) != null) {
        return LiabilityTreeCache.get(roothash)!
      }
      const result = await queryBuilder("liability_tree")
        .select("*")
        .where({ roothash })
        .first()
      if (result == null) {
        return new CouldNotFindTreeError("Liability tree not found")
      }
      const liabilityTree: LiabilityTree = {
        merkleTree: result.merkle_tree,
        accountToNonceMap: new Map(result.account_to_nonce_map),
      }
      LiabilityTreeCache.put(roothash, liabilityTree)
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
