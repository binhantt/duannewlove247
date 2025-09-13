import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.integer("conversation_id").unsigned().notNullable()
      .references("id").inTable("conversations").onDelete("CASCADE");
    table.integer("sender_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.text("content").notNullable();
    table.boolean("is_read").defaultTo(false);
    table.timestamp("sent_at").defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTableIfExists("messages");
}

