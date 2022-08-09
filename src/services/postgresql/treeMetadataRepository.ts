import {
  CouldNotPersistTreeMetadataError,
  CouldNotFindTreeMetadataError,
} from "../../domain/error"
import { queryBuilder } from "./query-builder"

export const TreeMetadataRepository = (): ITreeMetadataRepository => {
  const findLatestTreeMetadata = async (): Promise<
    TreeMetadata | CouldNotFindTreeMetadataError
  > => {
    const latestTreeMetadata = await queryBuilder("tree_metadata")
      .select("*")
      .orderBy("date_created", "desc")
      .first()
    return {
      totalBalance: latestTreeMetadata.total_balance,
      roothash: latestTreeMetadata.roothash,
      dateCreated: latestTreeMetadata.date_created,
    }
  }
  const persistNew = async (
    treeMetadataArgs: TreeMetadataArgs,
  ): Promise<TreeMetadata | CouldNotPersistTreeMetadataError> => {
    try {
      const { roothash, totalBalance } = treeMetadataArgs
      const result = await queryBuilder("tree_metadata")
        .insert({
          roothash,
          total_balance: totalBalance,
        })
        .returning("*")

      return {
        roothash: result[0].roothash,
        totalBalance: result[0].total_balance,
        dateCreated: result[0].date_created,
      }
    } catch (err) {
      return new CouldNotPersistTreeMetadataError(err)
    }
  }
  return {
    findLatestTreeMetadata,
    persistNew,
  }
}
