interface ILiabilityTreeRepository {
  persistNew: (tree: LiabilityTree, roothash: string) => Promise<LiabilityTree | Error>
  findLiabilityTree: (roothash: string) => Promise<LiabilityTree | Error>
}
