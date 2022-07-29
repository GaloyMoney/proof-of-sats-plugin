import { pool } from "./postgres-config"
import { UnknownRepositoryError, CouldNotFindError } from "../../domain/error"

export const TreeMetadataRepository = (): ITreeMetadataRepository => {
  const persistNew = async (
    treeMetadataArgs: TreeMetadataArgs,
  ): Promise<TreeMetadata | Error> => {
    try {
      const { roothash, totalBalance } = treeMetadataArgs
      const query = `INSERT INTO metadata (roothash, total_balance) VALUES ($1, $2) RETURNING *`
      const values = [roothash, totalBalance]
      const result = await pool.query(query, values)
      return {
        roothash: result.rows[0].roothash,
        totalBalance: result.rows[0].total_balance,
        dateCreated: result.rows[0].date_created,
      }
    } catch (err) {
      return new UnknownRepositoryError(err)
    }
  }
  const findLatestTreeMetadata = async (): Promise<TreeMetadata | Error> => {
    try {
      const query = `SELECT * FROM metadata ORDER BY date_created DESC LIMIT 1`
      const result = await pool.query(query)
      return {
        roothash: result.rows[0].roothash,
        totalBalance: result.rows[0].total_balance,
        dateCreated: result.rows[0].date_created,
      }
    } catch (err) {
      return new CouldNotFindError(err)
    }
  }
  return {
    persistNew,
    findLatestTreeMetadata,
  }
}