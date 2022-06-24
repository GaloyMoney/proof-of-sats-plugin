interface ILiabilityTreeRepository {
  persistNew: (tree: LiabilityTree, name: string) => Promise<LiabilityTree | Error>
  findLiabilityTree: (name: string) => Promise<LiabilityTree | Error>
}
