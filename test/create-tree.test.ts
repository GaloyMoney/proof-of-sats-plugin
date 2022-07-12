import { createTree } from "../src/app/create-tree"

describe("it test the createTree function", () => {
  it("should return a tree", async () => {
    const tree = await createTree()
    if (tree instanceof Error) throw tree
    expect(tree).toBeDefined()
    expect(tree.merkleTree).toBeDefined()
    expect(tree.accountToNonceMap).toBeDefined()
  })
})
