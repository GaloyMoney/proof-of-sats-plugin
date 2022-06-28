import { createProof } from "proof-of-liabilities"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"
import { getTree } from "../app/index"
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

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: Proof,
  }),
})
