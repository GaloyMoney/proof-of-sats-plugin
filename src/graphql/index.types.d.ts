type LiabilityProof = {
  accountId: string
  totalBalance: number
  partialLiabilityProofs: PartialLiabilityProofs
}

type PartialLiabilityProofs = {
  merklePath: MerklePath
  idx: number
  balance: number
}

type MerklePath = {
  node: TreeNode
  index: number
}[]

type TreeNode = {
  hash: string
  sum: number
}

type Tree = {
  merkleTree: Array<Array<TreeNode>>
  accountToNonceMap: Map<string, string>
}

type TreeMetadata = {
  roothash: string
  totalBalance: number
  createdDate: number
}

type LiabilityTree = Tree & {
  treeMetadata: TreeMetadata
}
