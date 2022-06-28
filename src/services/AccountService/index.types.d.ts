interface IAccountService {
  fetchAccounts: () => Promise<Array<{ accountId: string; balance: number }> | Error>
}
