import { GT } from "../.."
import { TreeMetadata } from "../types/objects/tree-metadata"
import { getLatestTreeMetadata } from "../../../app"

const TreeMetadataQuery = GT.Field({
  type: TreeMetadata,
  resolve: async () => {
    const treeMetadata = await getLatestTreeMetadata()
    if (treeMetadata instanceof Error) throw treeMetadata
    return {
      roothash: treeMetadata.roothash,
      totalBalance: treeMetadata.totalBalance,
      dateCreated: new Date(treeMetadata.dateCreated).toISOString(),
    }
  },
})

export default TreeMetadataQuery
