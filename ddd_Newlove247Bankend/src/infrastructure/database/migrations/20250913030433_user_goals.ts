import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      await knex.schema.createTable("user_goals", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("goal_id").unsigned().notNullable()
      .references("id").inTable("dating_goals").onDelete("CASCADE");
    table.unique(["user_id", "goal_id"]);
  });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("user_goals");
}

