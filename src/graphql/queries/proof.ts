import { createProof } from "proof-of-liabilities"
import { GT } from ".."
import LiabilityProof from "../types/objects/liability-proof"
import { getTree } from "../../app"

const ProofQuery = GT.Field({
  type: LiabilityProof,
  args: {
    accountId: { type: GT.NonNull(GT.String) },
    merkleRoot: { type: GT.NonNull(GT.String) },
  },
  resolve: async (_, { accountId, merkleRoot }) => {
    const tree = await getTree(merkleRoot)
    if (tree instanceof Error) throw tree
    const proof = await createProof(accountId, tree)
    if (proof instanceof Error) throw proof
    return {
      accountId,
      partialLiabilityProofs: proof.partialLiabilityProofs,
      totalBalance: proof.totalBalance,
      nonce: proof.nonce,
    }
  },
})

export default ProofQuery
