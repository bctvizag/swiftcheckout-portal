import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.integer("stock").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.decimal("total").notNullable();
    table.string("status").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("orders");
  await knex.schema.dropTable("products");
}