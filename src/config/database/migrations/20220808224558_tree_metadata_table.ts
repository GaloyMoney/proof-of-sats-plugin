import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tree_metadata", (table) => {
    table.bigInteger("total_balance").notNullable()
    table.string("roothash").notNullable()
    table.timestamp("date_created").defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("tree_metadata")
}
