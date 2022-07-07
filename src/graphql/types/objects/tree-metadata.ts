import { GT } from "../../index"

export const TreeMetadata = GT.Object({
  name: "TreeMetadata",
  description: "Renders Tree Metadata such as TotalBalance and Roothash",
  fields: () => ({
    totalBalance: {
      type: GT.NonNull(GT.Int),
      description: "The total balance of all the wallets.",
    },
    rootHash: {
      type: GT.NonNull(GT.String),
      description: "The root hash of the tree.",
    },
    createdDate: {
      type: GT.NonNull(GT.String),
      description: "The date of publication of merkle tree.",
    },
  }),
})
