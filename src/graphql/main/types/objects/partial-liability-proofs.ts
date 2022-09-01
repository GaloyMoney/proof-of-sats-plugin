import { GT } from "../../.."

import { MerklePath } from "./merkle-path"

export const PartialLiabilityProofs = GT.Object<PartialLiabilityProofs>({
  name: "PartialLiabilityProofs",
  description: "A list of partialLiabilityProofs for a given walletId.",
  fields: () => ({
    merklePath: {
      type: GT.List(MerklePath),
      description: "The merkle path of the partial liability proof.",
    },
    idx: {
      type: GT.NonNull(GT.Int),
      description: "The index of the node in the merkle path.",
    },
    balance: {
      type: GT.NonNull(GT.Int),
      description: "The balance of the node.",
    },
  }),
})
