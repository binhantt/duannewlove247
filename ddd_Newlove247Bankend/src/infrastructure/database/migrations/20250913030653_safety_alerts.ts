import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable("safety_alerts", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.string("location");
    table.string("message");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTableIfExists("safety_alerts");
}

