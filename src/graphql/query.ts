import { GT } from "./"
import ProofQuery from "./queries/proof"
import TreeMetadataQuery from "./queries/tree-metadata"

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: ProofQuery,
    treeMetadata: TreeMetadataQuery,
  }),
})
