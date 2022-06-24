import { createProof } from "proof-of-liabilities"
import { GT } from "."
import LiabilityProof from "./types/objects/liability-proof"
import { fileSystemLiabilityTreeRepository } from "../services/fileSystemLiabilityTreeRepository"
const Proof = GT.Field({
  type: LiabilityProof,
  args: {
    accountId: { type: GT.NonNull(GT.String) },
    merkleRoot: { type: GT.NonNull(GT.String) },
  },
  resolve: async (parent, args, context, info) => {
    const { accountId, merkleRoot } = args
    const tree = await fileSystemLiabilityTreeRepository().findLiabilityTree(merkleRoot)
    const proof = await createProof(accountId, tree)
    return {
      accountId,
      partialLiabilityProofs: proof.partialLiabilityProofs,
      totalBalance: proof.totalBalance,
    }
  },
})
// Some accountId's to test it. ("659b8ec0-89af-40c7-9c4f-2749ff84b6a6","dc0cd8b9-af79-421e-839f-c73c6c019f1e","b962796c-0a28-4429-8498-2cabee182130", "ac9871fa-9868-4765-be02-8a754ad5ca5a")

export const Query = GT.Object({
  name: "Query",
  fields: () => ({
    liabilityProof: Proof,
  }),
})
