import { TreeMetadata } from "./schema"

interface TreeMetadataRecord {
  roothash: string
  totalBalance: number
  dateCreated: Date
}

export const TreeMetadataRepository = (): ITreeMetadataRepository => {
  const persistNew = async (
    roothash: string,
    totalBalance: number,
  ): Promise<void | Error> => {
    const dateCreated = new Date()
    try {
      const treeMetadata = new TreeMetadata({
        roothash,
        totalBalance,
        dateCreated,
      })
      await treeMetadata.save()
    } catch (err) {
      return err
    }
  }

  const findLatestTreeMetadata = async () => {
    try {
      const result = await TreeMetadata.findOne().sort({ _id: -1 }).limit(1) // This will return the latest TreeMetadata
      if (!result) return new Error("Could Not find the latest TreeMetadata")
      return resultToTreeMetadata(result)
    } catch (err) {
      return err
    }
  }
  return {
    persistNew,
    findLatestTreeMetadata,
  }
}
const resultToTreeMetadata = (result: TreeMetadataRecord) => {
  return {
    roothash: result.roothash,
    totalBalance: result.totalBalance,
    dateCreated: result.dateCreated,
  }
}
