import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("conversation_participants", (table) => {
    table.increments("id").primary();
    table.integer("conversation_id").unsigned().notNullable()
      .references("id").inTable("conversations").onDelete("CASCADE");
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("joined_at").defaultTo(knex.fn.now());
    table.unique(["conversation_id", "user_id"]);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("conversation_participants");
}

