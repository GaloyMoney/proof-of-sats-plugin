import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const treeMetadataSchema = new Schema({
  roothash: {
    type: String,
    required: true,
  },
  totalBalance: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export const TreeMetadata = mongoose.model("TreeMetadata", treeMetadataSchema)
