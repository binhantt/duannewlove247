import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable("friendships", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.enu("gender", ["male", "female", "other"]);
    table.integer("age");
    table.text("bio");
    table.text("interests"); // có thể lưu JSON stringify
    table.boolean("is_verified").defaultTo(false);
    table.integer("violation_count").defaultTo(0);
    table.dateTime("chat_ban_until");
    table.boolean("is_chat_locked").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
})
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTableIfExists("friendships");
}

