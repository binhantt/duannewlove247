import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("venues", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.enu("type", ["cafe", "restaurant", "bar", "theater", "park", "other"]);
    table.string("location");
    table.decimal("avg_price", 10, 2);
    table.text("description");
    table.decimal("rating", 3, 2).defaultTo(0);
    table.boolean("is_partner").defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("venues");
}

