import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex("products").del();
  await knex("orders").del();

  // Insert seed products
  await knex("products").insert([
    { name: "Product 1", price: 9.99, stock: 50 },
    { name: "Product 2", price: 19.99, stock: 30 },
    { name: "Product 3", price: 29.99, stock: 20 },
  ]);

  // Insert seed orders
  await knex("orders").insert([
    { total: 59.97, status: "Completed" },
    { total: 29.99, status: "Completed" },
    { total: 89.97, status: "Completed" },
  ]);
}
