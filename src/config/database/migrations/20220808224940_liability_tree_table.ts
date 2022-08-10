import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("liability_tree", (table) => {
    table.jsonb("merkle_tree").notNullable()
    table.jsonb("account_to_nonce_map").notNullable()
    table.string("roothash").notNullable()
    table.timestamp("date_created").defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("liability_tree")
}
