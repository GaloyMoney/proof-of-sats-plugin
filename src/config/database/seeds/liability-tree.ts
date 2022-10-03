import { Knex } from "knex"
import { createLiabilitiesTree } from "@galoymoney/proof-of-sats"

import accounts from "./accounts.json"

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("table_name").del()
  const { merkleTree, accountToNonceMap } = await createLiabilitiesTree(accounts)
  const roothash = merkleTree[0][0]
  const total_balance = merkleTree[0][1]
  // Inserts seed entries
  await knex("liability_tree").insert({
    merkle_tree: merkleTree,
    account_to_nonce_map: accountToNonceMap,
    roothash,
  })
  await knex("tree_metadata").insert({
    roothash,
    total_balance,
  })
}
