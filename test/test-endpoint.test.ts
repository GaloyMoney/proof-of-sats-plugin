import { GaloyAccountService } from "../src/services/AccountService/galoy-account-service"
describe("test the fetchAccount function", () => {
  it("should return an object", async () => {
    const result = await GaloyAccountService().fetchAccounts()
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(Object)
    expect(result[0]).toHaveProperty("accountId")
    expect(result[0]).toHaveProperty("balance")
  })
})
