import { getTree } from "../src/app/index"

describe("it test if a valid tree is being returned", () => {
  it("should return a tree", async () => {
    const tree = await getTree(
      "ecb7bc9323689daca43fe2e9dbab42c9e489dc92257bcb951c489c5aaa638867",
    )
    if (tree instanceof Error) return tree
    expect(tree).toBeDefined()
    expect(tree).toHaveProperty("merkleTree")
    expect(tree).toHaveProperty("accountToNonceMap")
    expect(tree.merkleTree).toBeInstanceOf(Array)
    expect(tree.accountToNonceMap).toBeInstanceOf(Map)
    expect(tree.merkleTree[0][0]).toHaveProperty("hash")
    expect(tree.merkleTree[0][0]).toHaveProperty("sum")
    expect(tree.merkleTree[0].length).toBe(1)
  })
})
