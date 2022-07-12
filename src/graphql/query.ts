import { createProof } from "proof-of-liabilities"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"
import { getTree } from "../app/index"
import { TreeMetadata } from "./types/objects/tree-metadata"
import { getLatestTreeMetadata } from "../app/get-latest-tree-metadata"

const Proof = GT.Field({
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
      nonce: proof.nonce,
    }
  },
})

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

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: Proof,
    treeMetadata: TreeMetadataQuery,
  }),
})
