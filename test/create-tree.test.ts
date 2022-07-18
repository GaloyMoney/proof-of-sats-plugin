import { createTree } from "../src/app/create-tree"
import dbconnnection from "../src/services/mongodb"
jest.setTimeout(100000)
describe("it test the createTree function", () => {
  it("should return a tree", async () => {
    await dbconnnection().then(async (mongoose) => {
      const tree = await createTree()
      if (tree instanceof Error) throw tree
      expect(tree).toBeDefined()
      expect(tree.merkleTree).toBeDefined()
      expect(tree.accountToNonceMap).toBeDefined()
      await mongoose.connection.close()
    })
  })
})
