import { GALOY_GRAPHQL_ENDPOINT } from "../../config/index"
import fetch from "node-fetch"

const getAccountIds = async () => {
  const query = `query{
    listWalletIds(walletCurrency:BTC)
  }`
  const response = await fetch(GALOY_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ query }),
  })
  const data = await response.json()
  return data.data.listWalletIds
}

const queryBuilderToFetchWallet = (id: string): string => {
  return `query {
  wallet(walletId: "${id}") {
    id
    balance
  }
}`
}

export const GaloyAccountService = (): IAccountService => {
  const fetchAccounts = async (): Promise<Account[] | Error> => {
    try {
      const accounts: Account[] = []
      const AccountIds = await getAccountIds()
      for (const accountId of AccountIds) {
        const query = queryBuilderToFetchWallet(accountId)
        const response = await fetch(GALOY_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ query }),
        })
        const data = await response.json()
        const { wallet } = data.data
        accounts.push({
          accountId: wallet.id,
          balance: wallet.balance,
        })
      }
      return accounts
    } catch (err) {
      return err
    }
  }
  return { fetchAccounts }
}
