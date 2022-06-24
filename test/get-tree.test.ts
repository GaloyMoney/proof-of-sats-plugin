import { fileSystemLiabilityTreeRepository } from "../src/services/LiabilityTreeRepository/fileSystemLiabilityTreeRepository"

describe("it test if a valid tree is being returned", () => {
  it("should return a tree", async () => {
    const tree = await fileSystemLiabilityTreeRepository().findLiabilityTree(
      "a60d7ab1ef9252cf2c44b7206b9e502777bc0ebad1a3c98941019d148b5a2f83",
    )
    console.log(tree)
  })
})
