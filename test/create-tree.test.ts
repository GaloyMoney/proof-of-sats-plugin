import { createTree } from "../src/app/create-tree"

describe("it test the createTree function", () => {
  it("should return a tree", async () => {
    const tree = await createTree()
    expect(tree).toBeDefined()
  })
})
