import { GT } from "../../.."
import { PartialLiabilityProofs } from "./partial-liability-proofs"
const LiabilityProof = GT.Object<LiabilityProof>({
  name: "LiabilityProof",
  description:
    "A proof of liability containing total balance and merkle paths for a given walletId.",
  fields: () => ({
    accountId: {
      type: GT.NonNull(GT.String),
      description: "The walletId to which the proof belongs.",
    },
    totalBalance: {
      type: GT.NonNull(GT.Int),
      description: "The total balance of the wallet.",
    },
    partialLiabilityProofs: {
      type: GT.List(PartialLiabilityProofs),
      description: "The serialized partial liability proofs of the wallet.",
    },
    nonce: {
      type: GT.NonNull(GT.String),
      description: "The nonce of the proof.",
    },
  }),
})

export default LiabilityProof
