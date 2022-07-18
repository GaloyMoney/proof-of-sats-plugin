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

type TreeMetadata = {
  roothash: string
  totalBalance: number
  dateCreated: string
}
interface ITreeMetadataRepository {
  persistNew: (roothash: string, totalBalance: number) => Promise<TreeMetadata | Error>
  findLatestTreeMetadata: () => Promise<TreeMetadata | Error>
}

interface TreeMetadataRecord {
  roothash: string
  totalBalance: number
  dateCreated: Date
}
