type Account = {
  accountId: string
  balance: number
}

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

type LiabilityTree = {
  merkleTree: Array<Array<TreeNode>>
  accountToNonceMap: Map<string, string>
}

interface IAccountService {
  fetchAccounts: () => Promise<Account[] | Error>
}
