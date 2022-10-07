import { GT } from "../../.."

export const TreeMetadata = GT.Object<TreeMetadata>({
  name: "TreeMetadata",
  description: "Return the latest Tree Metadata from the database",
  fields: () => ({
    roothash: {
      type: GT.NonNull(GT.String),
      description: "The roothash of the tree",
    },
    totalBalance: {
      type: GT.NonNull(GT.Float),
      description: "The total balance of the tree",
    },
    dateCreated: {
      type: GT.NonNull(GT.String),
      description: "The date the tree was created",
    },
  }),
})
