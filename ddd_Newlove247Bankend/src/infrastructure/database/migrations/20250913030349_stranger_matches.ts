import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("stranger_matches", (table) => {
    table.increments("id").primary();
    table.integer("user_a_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("user_b_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("matched_at").defaultTo(knex.fn.now());
    table.enu("status", ["active", "ended"]).defaultTo("active");
    table.unique(["user_a_id", "user_b_id"]);
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("stranger_matches");
}

