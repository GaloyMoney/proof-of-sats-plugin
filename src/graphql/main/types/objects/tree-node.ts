import { GT } from "../../.."

export const TreeNode = GT.Object<TreeNode>({
  name: "TreeNode",
  description: "Represents a node of a tree.",
  fields: () => ({
    hash: {
      type: GT.NonNull(GT.String),
      description: "The hash of the node.",
    },
    sum: {
      type: GT.NonNull(GT.Float),
      description: "The sum of the node.",
    },
  }),
})
