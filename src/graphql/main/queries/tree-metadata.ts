import { getLatestTreeMetadata } from "@app"
import { GT } from "@graphql/index"

import { TreeMetadata } from "../types/objects/tree-metadata"

const TreeMetadataQuery = GT.Field({
  type: TreeMetadata,
  resolve: async () => {
    const treeMetadata = await getLatestTreeMetadata()
    if (treeMetadata instanceof Error) throw treeMetadata
    return {
      roothash: treeMetadata.roothash,
      totalBalance: treeMetadata.totalBalance,
      dateCreated: treeMetadata.dateCreated,
    }
  },
})

export default TreeMetadataQuery
