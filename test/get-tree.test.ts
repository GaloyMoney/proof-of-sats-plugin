import { getTree } from "../src/app/index"

describe("it test if a valid tree is being returned", () => {
  it("should return a tree", async () => {
    const tree = await getTree(
      "8f596a092ca625f707d847fc5ab47dbb5b6c7a0737ccbedc3cc510e63825f619",
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
