import { TreeMetadataRepository } from "../src/services/TreeMetadataRepository/treeMetadataRepository"

describe("it tests the Tree Metadata Repository", () => {
  it("should return the latest Tree Metadata", async () => {
    const result = await TreeMetadataRepository().findLatestTreeMetadata()
    expect(result).toBeDefined()
    expect(result).toHaveProperty("roothash")
    expect(result).toHaveProperty("totalBalance")
    expect(result).toHaveProperty("dateCreated")
  })
})
