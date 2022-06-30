import { createProof } from "proof-of-liabilities"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"
import { getTree } from "../app/index"
import { TreeMetadata } from "./types/objects/tree-metadata"
const LiabilityProofQuery = GT.Field({
  type: LiabilityProof,
  args: {
    accountId: { type: GT.NonNull(GT.String) },
    merkleRoot: { type: GT.NonNull(GT.String) },
  },
  resolve: async (parent, args, context, info) => {
    const { accountId, merkleRoot } = args
    const tree = await getTree(merkleRoot)
    const proof = await createProof(accountId, tree)
    return {
      accountId,
      partialLiabilityProofs: proof.partialLiabilityProofs,
      totalBalance: proof.totalBalance,
    }
  },
})
const TreeMetadataQuery = GT.Field({
  type: TreeMetadata,
  args: {
    rootHash: { type: GT.NonNull(GT.String) },
  },
  resolve: async (parent, args, context, info) => {
    const { rootHash } = args
    const tree = await getTree(rootHash)
    if (tree instanceof Error) return new Error("Tree not found")
    return {
      totalBalance: tree.treeMetadata.totalBalance,
      rootHash: tree.treeMetadata.roothash,
      date: new Date(tree.treeMetadata.timestamp).toLocaleString(),
    }
  },
})

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: LiabilityProofQuery,
    TreeMetadata: TreeMetadataQuery,
  }),
})
