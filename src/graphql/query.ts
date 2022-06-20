import { createProof } from "proof-of-liabilities"
import { tree } from "./helper"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"

// Also tested it using a tree.json file. Works the same way as expected.

const Proof = GT.Field({
  type: LiabilityProof,
  args: {
    accountId: { type: GT.NonNull(GT.String) },
  },
  resolve: async (parent, args, context, info) => {
    const { accountId } = args
    const proof = await createProof(accountId, tree)
    return {
      accountId,
      partialLiabilityProofs: proof.partialLiabilityProofs,
      totalBalance: proof.totalBalance,
    }
  },
})

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: Proof,
  }),
})

// type PartialLiabilityProof {
//   merklePath: [MerklePath]!
//   idx: Int!
//   balance: Int!
// }
// type MerklePath {
//   node: TreeNode!
//   index: Int!
// }
// type TreeNode {
//   hash: String!
//   sum: Int!
// }
