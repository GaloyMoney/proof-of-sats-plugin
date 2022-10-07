import { Knex } from "knex"
import { createLiabilitiesTree } from "@galoymoney/proof-of-sats"

const accounts = [
  {
    accountId: "123456789012",
    balance: 133145543678,
  },
  {
    accountId: "123456789013",
    balance: 235221436264,
  },
  {
    accountId: "123456789014",
    balance: 324523245765,
  },
  {
    accountId: "123456789015",
    balance: 234248645233,
  },
  {
    accountId: "123456789016",
    balance: 123456789345,
  },
]

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("liability_tree").del()
  const { merkleTree, accountToNonceMap } = await createLiabilitiesTree(accounts)
  const roothash = merkleTree[0][0].hash
  const total_balance = merkleTree[0][0].sum
  const jsonMerkleTree = JSON.stringify(merkleTree)
  const jsonAccountToNonceMap = JSON.stringify(Array.from(accountToNonceMap.entries()))
  // Inserts seed entries
  await knex("liability_tree").insert({
    merkle_tree: jsonMerkleTree,
    account_to_nonce_map: jsonAccountToNonceMap,
    roothash,
  })
  await knex("tree_metadata").insert({
    roothash,
    total_balance,
  })
}
