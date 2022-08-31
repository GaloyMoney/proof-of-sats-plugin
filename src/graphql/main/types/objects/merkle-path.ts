import { GT } from "../../.."

import { TreeNode } from "./tree-node"

export const MerklePath = GT.Object<MerklePath>({
  name: "MerklePath",
  description: "A list of merkle paths for a given walletId.",
  fields: () => ({
    node: {
      type: TreeNode,
      description: "The node of the merkle path.",
    },
    index: {
      type: GT.NonNull(GT.Int),
      description: "The index of the node in the merkle path.",
    },
  }),
})
