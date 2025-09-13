import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("subscriptions", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.enu("plan", ["free", "premium", "vip"]).defaultTo("free");
    table.dateTime("start_date");
    table.dateTime("end_date");
  });

}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("subscriptions");
}

