import { createTree } from "../src/app/create-tree"
import { LiabilityTreeRepository } from "../src/services/LiabilityTreeRepository/liabilityTreeRepository"
import { TreeMetadataRepository } from "../src/services/TreeMetadataRepository/treeMetadataRepository"

describe("test the createTree function", () => {
  it("should create a new tree", async () => {
    const tree = await createTree()
    expect(tree).toBeDefined()
    expect(tree).toHaveProperty("merkleTree")
    expect(tree).toHaveProperty("accountToNonceMap")
  })
})

describe("test it the latest liability tree is being returned", () => {
  it("should return the latest liabilityTree", async () => {
    const treeMetadata = await TreeMetadataRepository().findLatestTreeMetadata()
    if (treeMetadata instanceof Error) return treeMetadata
    const { roothash } = treeMetadata
    console.log(roothash)
    const tree = await LiabilityTreeRepository().findLiabilityTree(roothash)
    expect(tree).toBeDefined()
    expect(tree).toHaveProperty("merkleTree")
    expect(tree).toHaveProperty("accountToNonceMap")
    console.log(tree)
  })
})
