import { fetchAccounts } from "../src/app/create-tree"

describe("test the fetchAccount function", () => {
  it("should return an object", async () => {
    const result = await fetchAccounts()
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(Object)
    expect(result[0]).toHaveProperty("accountId")
    expect(result[0]).toHaveProperty("balance")
  })
})
