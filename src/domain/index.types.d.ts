// TODO : Change the name to LiabilityAccount and liabilityAccountId
type Account = {
  readonly accountId: string
  readonly balance: number
}

type LiabilityProof = {
  accountId: string
  totalBalance: number
  partialLiabilityProofs: PartialLiabilityProofs
  nonce: string
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
  persistNew: (treeMetadataArgs: TreeMetadataArgs) => Promise<TreeMetadata | Error>
  findLatestTreeMetadata: () => Promise<TreeMetadata | Error>
}

type TreeMetadataArgs = {
  roothash: string
  totalBalance: number
}

interface ILiabilityTreeRepository {
  persistNew: (tree: LiabilityTree, roothash: string) => Promise<LiabilityTree | Error>
  findLiabilityTree: (roothash: string) => Promise<LiabilityTree | Error>
}
