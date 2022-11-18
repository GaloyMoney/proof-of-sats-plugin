const GALOY_GRAPHQL_ENDPOINT =
  process.env.GALOY_GRAPHQL_ENDPOINT || "http://localhost:4001/graphql"
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
}

const getAccountIds = async () => {
  const query = `
    query listWalletIds {
      listWalletIds(walletCurrency: BTC)
    }
  `
  try {
    const response = await fetch(GALOY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    })
    const {
      data: { listWalletIds },
    } = await response.json()
    return listWalletIds
  } catch (err) {
    return err
  }
}

export const GaloyAccountService = (): IAccountService => {
  const fetchAccounts = async (): Promise<Account[] | Error> => {
    try {
      const accounts: Account[] = []
      const accountIds = await getAccountIds()
      for (const id of accountIds) {
        const query = `query wallet{
          wallet(walletId: "${id}"){
            id
            balance
          }
        }`
        const response = await fetch(GALOY_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers,
          body: JSON.stringify({ query }),
        })
        const {
          data: { wallet },
        } = await response.json()
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
